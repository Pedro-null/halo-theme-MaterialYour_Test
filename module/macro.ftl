<#macro layout title>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="keywords" content="${meta_keywords!}"/>
    <meta name="description" content="${meta_description!}" />
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <@global.head />
    <title>${title}</title>
    <link rel="stylesheet" href="${theme_base!}/source/css/mdui.min.css"/>
    <link rel="stylesheet" href="${theme_base!}/source/css/style.css">
    <link rel="stylesheet" href="${theme_base!}/source/css/tocbot.css">
    <link rel="stylesheet" href="${theme_base!}/source/css/prism.css">
    <link rel="stylesheet" href="${theme_base!}/source/css/viewer.min.css">
    <link rel="stylesheet" href="${theme_base!}/source/css/prism-material-light.css">
    <script src="${theme_base!}/source/js/jquery.min.js"></script>
    <script src="${theme_base!}/source/js/tocbot.min.js"></script>
    <script src="${theme_base!}/source/js/viewer.min.js"></script>
    <script src="${theme_base!}/source/js/jquery-viewer.min.js"></script>
</head>
<body class="mdui-drawer-body-left ${settings.mdui_theme!default}">
    
    <#include "menu.ftl">

    <#nested >

    <@global.footer />
    <#include "footer.ftl">
    <@footer/>
<script src="${theme_base!}/source/js/prism.js"></script>
<script src="${theme_base!}/source/js/mdui.min.js"></script>
<script src="${theme_base!}/source/js/script.js"></script>
</body>
</html>
</#macro>

