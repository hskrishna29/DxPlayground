var MainModule = function($) {
    var getData = function(callback) {
        $.getJSON("../Content/Resources/campaigns.json", function (data) {
            callback(data);
        }).fail(function () { console.log("Oops, something went wrong") });
    }

    return {
        getData : getData
    }
}($);