// common functions used on many pages

function getDeviceType() {
    return window.getComputedStyle(
        document.getElementsByTagName('body')[0], ':before'
    ).getPropertyValue('content').replace(/"/g, '');
}

function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

function trimLeft(str) {
    return str.replace(/^[\s\uFEFF\xA0]+/g, '');
}

function trimRight(str) {
    return str.replace(/[\s\uFEFF\xA0]+$/g, '');
}

function unixtime(date) {
    switch (typeof date) {
        case 'string': // eg 03 Jan 2009 18:15:05 GMT
            return Math.round(Date.parse(date) / 1000);
        case 'object': // ie a Date() object
            return Math.round(date.getTime() / 1000);
        default:
            return Math.round((new Date()).getTime() / 1000);
    }
}

NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = function () {
    return true;
};

function isNodeList(elements) {
    try {
        return (elements.isNodeList() === true);
    } catch (err) {
        return false;
    }
}

function foreach(els, callback) {
    if (isNodeList(els) || (els instanceof Array)) {
        for (var i = 0; i < els.length; i++) {
            if (callback(i, els[i]) === false) break;
        }
    } else if (typeof els === 'object') {
        for (var key in els) {
            if (!els.hasOwnProperty(key)) continue;
            if (callback(key, els[key]) === false) break;
        }
    }
}

function addEvent(element, types, callback) {
    if (element == null || typeof(element) == 'undefined') return;
    var elements = (isNodeList(element) ? element : [element]);
    var typesArr = types.split(',');
    foreach(elements, function (elI, el) {
        foreach(typesArr, function (typeI, type) {
            type = type.replace(/ /g, '');
            if (el.addEventListener) {
                el.addEventListener(type, callback, false);
            } else if (el.attachEvent) { // ie
                el.attachEvent('on' + type, callback);
            } else {
                el['on' + type] = callback;
            }
        });
    });
}

function triggerEvent(element, type) {
    if (element == null || typeof(element) == 'undefined') return;
    var elements = (isNodeList(element) ? element : [element]);
    foreach(elements, function (elI, el) {
        if ('createEvent' in document) {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(type, false, true);
            el.dispatchEvent(evt);
        }
        else el.fireEvent('on' + type);
    });
}

function popup(heading, detail) {
    document.getElementById('fullpagePopupHeading').innerHTML = heading;
    document.getElementById('fullpagePopupDetail').innerHTML = detail;
    document.getElementById('fullpagePopupNotification').style.display = 'table';
    setTimeout(hidePopup, 3000);
}

function hidePopup() {
    document.getElementById('fullpagePopupNotification').style.display = 'none';
}

function addLi2Ul(ul, liID, text, className) {
    if (typeof ul == 'string') ul = document.querySelector(ul);
    var li = document.createElement('li');
    if (liID != null) li.id = liID;
    if (className != null) li.className = className;
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
}

function deleteElementById(elID) {
    deleteElement(document.getElementById(elID));
}

function deleteElement(el) {
    if (el == null) return;
    el.parentNode.removeChild(el);
}

function deleteElements(element) {
    var elements = (isNodeList(element) ? element : [element]);
    if (elements.length == 0) return;
    foreach(elements, function (i, el) {
        deleteElement(el);
    });
}

function isHex(val) {
    var regex = /^-?[0-9a-f]+$/gi;
    return regex.test(val);
}

function stringIsInt(x)  {
    return (x == parseInt(x, 10));
}

function stringIsFloat(x)  {
    return (x == parseFloat(x));
}

function setButtons(enable) {
    foreach(arguments, function (i, arg) {
        if (i == 0) return; // continue
        document.getElementById('btn' + arg).disabled = !enable;
    });
}

// find needle in haystack - works for strings as well as arrays
function inArray(needle, haystack) {
    // note: does not work with with NaN or ie < 9
    return (haystack.indexOf(needle) > -1);
}

function mergeObjects(/*eg {a:1}, {b:2}, {c:3}*/) {
    var retObj = {};
    foreach(arguments, function (i, obj) {
        foreach(obj, function (k, v) {
            retObj[k] = v;
        });
    });
    return retObj;// eg {a:1, b:2, c:3}
}

// 1000 -> 1,000
function addThousandCommas(number) {
    number += ''; // convert to string
    var numberParts = number.split('.');
    var whole = numberParts[0];
    var decimals = ((numberParts.length > 1) ? '.' + numberParts[1] : '');
    var regex = /(\d+)(\d{3})/;
    while (regex.test(whole)) {
        whole = whole.replace(regex, '$1' + ',' + '$2');
    }
    return whole + decimals;
}

function ajax(url, callback) {
    // doesn't work on opera mini :(
    var xhttp = new XMLHttpRequest();
    addEvent(xhttp, 'readystatechange', function () {
        if (this.readyState != XMLHttpRequest.DONE) return;
        if (this.status != 200) return;
        callback(this.responseText);
    });
    xhttp.open('GET', url);
    xhttp.send();
}

Element.prototype.up = function (num) {
    var el = this;
    for (var i = 0; i < num; i++) el = el.parentNode;
    return el;
}

// align text at <span class="aligner"/>. currently only 1 aligner is supported
// per line
var uniqueTextAligner = '|%|'; // something never used in the codeblock
function alignText(codeblock) {
    codeblock.style.whiteSpace = 'pre';
    var lines = codeblock.innerHTML.split('\n');
    if (lines.length == 1) return;

    // put the aligners in
    foreach(codeblock.querySelectorAll('.aligner'), function (i, el) {
        el.innerHTML = uniqueTextAligner;
    });
    lines = codeblock.innerHTML.split('\n');

    // find the biggest index position from any line
    var biggestIndentPos = 0; // init
    var linesWithoutAlignment = []; // init
    var linesNoHTML = {}; // init (avoid unnecessary dom operations)
    foreach(lines, function (lineI, line) {
        if (!inArray(uniqueTextAligner, line)) {
            linesWithoutAlignment.push(lineI);
            return; // continue
        }
        // strip html tags out (but keep content between)
        if (inArray('<', line) && inArray('>', line)) {
            var tmp = document.createElement('div');
            tmp.innerHTML = line;
            line = tmp.textContent;
        }
        linesNoHTML[lineI] = line;
        var indentPos = line.indexOf(uniqueTextAligner); // -1 if not found
        if (indentPos > biggestIndentPos) biggestIndentPos = indentPos;
    });

    // do the indentation on each line
    var alignerNum = 0;
    foreach(lines, function (lineI, line) {
        if (inArray(lineI, linesWithoutAlignment)) return; // continue
        var linePartsForCalc = linesNoHTML[lineI].split(uniqueTextAligner);
        // remove the unique aligner and align the text
        codeblock.querySelectorAll('.aligner')[alignerNum].innerHTML =
        ' '.repeat(biggestIndentPos - linePartsForCalc[0].length);
        alignerNum++;
    });
}

function unalignText(codeblock) {
    codeblock.style.whiteSpace = 'pre-wrap';
    foreach(codeblock.querySelectorAll('.aligner'), function (i, el) {
        el.innerHTML = '';
    });
}

function plural(wordEnding, plural) {
    switch (wordEnding) {
        case 's':
            if (plural) return 's';
            else return '';
    }
}

function scrollToElement(element) {
    element.scrollIntoView();
}

// trim an <input type="text"> and maintain cursor position
function trimInputValue(inputEl) {
    var noChange = true;
    var value = inputEl.value;
    var initialLength = value.length;
    if (initialLength == 0) return value;
    var newValue = trim(value);
    if (value == newValue) return value;

    // from here on, we know there are trim-related changes

    var cursor = { start: inputEl.selectionStart, end: inputEl.selectionEnd };

    var trimmedLeft = trimLeft(value);
    if (trimmedLeft.length != initialLength) {
        cursor.start -= (initialLength - trimmedLeft.length);
        cursor.end -= (initialLength - trimmedLeft.length);
    }
    inputEl.value = newValue;
    inputEl.setSelectionRange(cursor.start, cursor.end);
    return newValue;
}

function toggleCodeblockWrap(e) {
    var btn = e.currentTarget;
    var codeblock = btn.parentNode.parentNode.querySelector('.codeblock');
    if (btn.getAttribute('wrapped') == 'true') {
        btn.querySelector('i.fa-level-down').style.display = 'inline-block';
        btn.querySelector('i.fa-arrows-h').style.display = 'none';
        alignText(codeblock);
        btn.setAttribute('wrapped', 'false');
    } else {
        btn.querySelector('i.fa-level-down').style.display = 'none';
        btn.querySelector('i.fa-arrows-h').style.display = 'inline-block';
        unalignText(codeblock);
        btn.setAttribute('wrapped', 'true');
    }
}

function toggleAllCodeblockWrapsMobile() {
    triggerEvent(
        document.querySelectorAll('.auto-wrap-on-mobile button.wrap-nowrap'),
        'click'
    );
}

// events for all pages

// nav-menu open/close (mobile only)
addEvent(document.getElementById('btnNavbar'), 'click', function (e) {
    var btn = e.currentTarget;
    var menu = document.getElementById('navMenu');
    if (btn.getAttribute('menu-is-collapsed') == 'true') {
        btn.setAttribute('menu-is-collapsed', 'false');
        menu.style.display = 'block';
    } else {
        btn.setAttribute('menu-is-collapsed', 'true');
        menu.style.display = 'none';
    }
});

// prevent css :focus from persisting after a click, but allow it to remain
// after focus via keyboard tabbing
addEvent(document.getElementsByTagName('button'), 'click', function (e) {
    e.currentTarget.blur();
});

// prevent css :focus from persisting after a <select> change - internet
// explorer keeps the selection highlighted, which is ugly. apply the onchange
// to the body to cover dynamically added <select> elements
addEvent(document.getElementsByTagName('body')[0], 'change', function (e) {
    if (e.target.tagName.toLowerCase() != 'select') return;
    e.target.blur();
});

// button to toggle between word-wrap and no-wrap on a codeblock
addEvent(
    document.querySelectorAll('.codeblock-container button.wrap-nowrap'),
    'click',
    toggleCodeblockWrap
);
