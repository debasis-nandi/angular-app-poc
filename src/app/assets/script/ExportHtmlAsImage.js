
function onSubmitClick(ChartID) {

    //var ChartID = 'chart-container-' + id;

    var canvas = document.createElement('canvas');
    var context = $(canvas)[0].getContext('2d');
    var url;

    $(canvas).attr("width", $("#" + ChartID + "").clientWidth);
    $(canvas).attr("height", $("#" + ChartID + "").clientHeight);


    var imageCanvas = document.createElement('canvas');
    var contextImageCanvas = $(imageCanvas)[0].getContext('2d');

    $(imageCanvas).attr("width", $("#" + ChartID + "").clientWidth);
    $(imageCanvas).attr("height", $("#" + ChartID + "").clientHeight);


    var canvasforTempImage = document.createElement('canvas');
    var imageTorenderOnCanvas = new Image();
    var imageTorenderOnImageCanvas = new Image();
    var elemCount = $("#" + ChartID + "").children().length;

    $("#" + ChartID + "").children().each(function (index, element) {

        $(element).find("g>image").each(function (imageIndex, image) {
            if (IsNotNullAndNotUndefined(image.href.baseVal) && IsNotNullAndNotUndefined(image.width.baseVal.value) && IsNotNullAndNotUndefined(image.height.baseVal.value)
                                            && IsNotNullAndNotUndefined(image.x.baseVal.value) && IsNotNullAndNotUndefined(image.y.baseVal.value)) {

                var imageParentCoordinate = $(image).parent().attr('transform').split(' ');
                var imageParentXCoordinate;
                var imageParentYCoordinate;
                var isChrome = !!window.chrome && !!window.chrome.webstore;
                if (isChrome) {
                    imageParentXCoordinate = image.x.baseVal.value + 128;
                    imageParentYCoordinate = image.y.baseVal.value + 10;
                }
                else {
                    imageParentXCoordinate = image.x.baseVal.value + (imageParentCoordinate.length > 2 ? Number(imageParentCoordinate[imageParentCoordinate.length - 2]) : 0);
                    imageParentYCoordinate = image.y.baseVal.value + (imageParentCoordinate.length > 2 ? Number(imageParentCoordinate[imageParentCoordinate.length - 1].replace(")", "")) : 0);

                }
                var imageElement = new Image(image.width.baseVal.value, image.height.baseVal.value);
                imageElement.src = image.href.baseVal;

                contextImageCanvas.drawImage(imageElement, imageParentXCoordinate, imageParentYCoordinate, image.width.baseVal.value, image.height.baseVal.value);
            }
            else {
                return;
            }
        });

        canvasforTempImage = drawSvgOnCanvas($(element));
        imageTorenderOnCanvas.src = canvasforTempImage.toDataURL("image/png");
        imageTorenderOnImageCanvas.src = imageCanvas.toDataURL('image/png');


        url = $(canvasforTempImage)[0].toDataURL("image/png");
        //imageTorenderOnCanvas.onload = function () {
        //    context.drawImage(imageTorenderOnCanvas, 0, 0);

        //    html2canvas([document.getElementById("" + id + "")], {
        //        onrendered: function (imageCanvas) {
        //        }
        //    });
        //};
    });
    return url;
}

function drawSvgOnCanvas(element) {

    //var drawSvgOnCanvas = function (element) {

    var imageCanvas = document.createElement('canvas');
    var svgElement;

    if ($(element).find("span[class*='fusioncharts-container']").length > 0) {
        svgElement = $(element).find("span[class*='fusioncharts-container']").length > 0
                           ? $(element).find("span[class*='fusioncharts-container']")
                           : $(element).parent().find("span[class*='fusioncharts-container']");
    }
    else {
        svgElement = $(element);
    }

    $(svgElement).find("svg").each(function () {
        $(this).removeAttr("xmlns");
    });

    var svgClone = $(svgElement).clone();
    svgClone.find('g').children('image').remove();
    svgClone.find('span').remove();
    svgClone.find('div').remove();

    var svgContent = svgClone.html().trim();
    if (!$(svgContent)[0].hasAttribute("xmlns")) {
        $(svgClone).find("svg").each(function () {
            $(this).attr("xmlns", "http://www.w3.org/2000/svg");
        });

        svgContent = svgClone.html().trim();
    }

    canvg(imageCanvas, svgContent);
    return imageCanvas;
};

function IsNotNullAndNotUndefined(T, isDomElement) {
    var isValid = false;
    isDomElement = (typeof isDomElement == "undefined" || typeof isDomElement == null || typeof isDomElement != "boolean") ? false : isDomElement;

    if (T != null && T != undefined) {
        if (isDomElement) {
            isValid = T.length > 0 ? true : false;
        }
        else {
            isValid = true;
        }
    }

    return isValid;
}
