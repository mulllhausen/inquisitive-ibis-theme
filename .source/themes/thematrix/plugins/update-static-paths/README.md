# Update Static Paths

This plugin hunts through all articles and pages, finds static paths, and adds
them to the pelican object so that they will be copied to the production dir
when building. HOWEVER, this data is not available to the pages, since pages are
built before reading this data. So its not a very useful plugin.
