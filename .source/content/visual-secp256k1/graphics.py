"""
functions related to plotting and calculating points on bitcoin's elliptic curve
polynomial (secp256k1)

disclaimer: these scripts are just for understanding concepts. they should not
be used for performing live crypto operations.
"""

import operations
import sympy, mpmath, numpy, matplotlib, hashlib
import matplotlib.pyplot as plt

img_dir = "" # init
output_html = None # init

# increase this to plot a finer-grained curve - good for zooming in.
# note that this does not affect lines (which only require 2 points).
curve_steps = 10000

# define matplotlib styles (matplotlib.org/users/customizing.html)
green = "#7db904"
grey = "#2b2b2b"
matplotlib.rc("axes", grid = True, edgecolor = green, facecolor = grey)
matplotlib.rc("xtick", color = green)
matplotlib.rc("ytick", color = green)
matplotlib.rc("figure", facecolor = grey) # for --stdout
matplotlib.rc("savefig", facecolor = grey, bbox = "tight") # for --html
matplotlib.rc("grid", color = green)

def init_secp256k1_plot(x_max = 4, color = "b"):
    """
    initialize the elliptic curve plot - create the figure and plot the curve
    but do not put any multiplication (doubling) lines on it yet and don't show
    it yet.

    we need to determine the minimum x value on the curve. y = sqrt(x^3 + 7) has
    imaginary values when (x^3 + 7) < 0, eg x = -2 -> y = sqrt(-8 + 7) = i,
    which is not a real number. so x^3 = -7, ie x = -cuberoot(7) is the minimum
    real value of x.
    """
    global plt, x_text_offset, y_text_offset
    x_min = -(7**(1 / 3.0))

    x_text_offset = (x_max - x_min) / 20
    y_max = operations.y_secp256k1(x_max, yp_pos = True)
    y_min = operations.y_secp256k1(x_max, yp_pos = False)
    y_text_offset = (y_max - y_min) / 20

    x = sympy.symbols("x")
    y = sympy.lambdify(x, operations.y_secp256k1(x, yp_pos = True), "numpy")
    plt.figure() # init
    x_array = numpy.linspace(x_min, x_max, curve_steps)
    # the top half of the elliptic curve
    plt.plot(x_array, y(x_array), color)
    plt.plot(x_array, -y(x_array), color)
    plt.ylabel("$y$", color = green)
    plt.xlabel("$x$", color = green)
    plt.title("secp256k1: $%s$" % operations.secp256k1_eq, color = green)

def plot_add_inf_field(
    p, q, p_name, q_name, p_plus_q_name, color = "r", labels_on = True
):
    """
    add-up two points on the curve (p & q). this involves plotting a line
    through both points and finding the third intersection with the curve (r),
    then mirroring that point about the x-axis. note that it is possible for the
    intersection to fall between p and q.

    colors:
    b: blue
    g: green
    r: red
    c: cyan
    m: magenta
    y: yellow
    k: black
    w: white

    use labels_on = False when zooming, otherwise the plot area will be expanded
    to see the text outside the zoom area
    """
    global plt, x_text_offset, y_text_offset
    (xp, yp) = p
    (xq, yq) = q
    # first, plot the line between the two points upto the intersection with the
    # curve...

    # get the point of intersection (r)
    (xr, yr) = operations.intersection(p, q)

    # convert sympy values into floats
    (xp, xq, xr) = (float(xp), float(xq), float(xr))
    (yp, yq, yr) = (float(yp), float(yq), float(yr))

    # get the range of values the x-axis covers
    x_min = min(xp, xq, xr)
    x_max = max(xp, xq, xr)

    # a line only needs two points
    x_array = numpy.linspace(x_min, x_max, 2)

    m = operations.slope(p, q)
    y_array = operations.y_line(x_array, p, m)
    plt.plot(x_array, y_array, color)

    # plot a point at p
    plt.plot(xp, yp, "%so" % color)

    if labels_on:
        # name the point at p
        p_name = ("$%s$" % p_name) if len(p_name) else ""
        plt.text(xp - x_text_offset, yp + y_text_offset, p_name)

    if p is not q:
        # plot a point at q
        plt.plot(xq, yq, "%so" % color)

        if labels_on:
            # name the point at q
            q_name = ("$%s$" % q_name) if len(q_name) else ""
            plt.text(xq - x_text_offset, yq + y_text_offset, q_name)

    # second, plot the vertical line to the other half of the curve...
    y_array = numpy.linspace(yr, -yr, 2)
    x_array = numpy.linspace(xr, xr, 2)
    plt.plot(x_array, y_array, "%s" % color)
    plt.plot(xr, -yr, "%so" % color)
    if labels_on:
        p_plus_q_name = ("$%s$" % p_plus_q_name) if len(p_plus_q_name) else ""
        plt.text(xr - x_text_offset, -yr + y_text_offset, p_plus_q_name)

def plot_subtract_inf_field(
    p, q, p_name, q_name, p_minus_q_name, color = "r", labels_on = True
):
    "p - q == p + (-q)"
    plot_add_inf_field(
        p, operations.negative(q), p_name, q_name, p_minus_q_name, color,
        labels_on
    )

def finalize_plot(img_filename = None):
    """
    either display the graph as a new window or save the graph as an image and
    write a link to the image in the img dir
    """
    try:
        save = output_html
    except:
        save = False

    if save:
        plt.savefig("%s/%s.png" % (img_dir, img_filename))
        return {
            "filename": "%s.png" % img_filename,
            "name": img_filename,
            "css_class": "secp256k1-plot"
        }

    else:
        plt.show(block = True)
        return {}
