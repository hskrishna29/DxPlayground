var MainModule = function ($, vueModule, koModule) {
    $(document).ready(function() {
        var getData = function () {
            $.getJSON("../Content/Resources/campaigns.json", function (data) {

                vueModule.load(data);
                koModule.load(data);

            }).fail(function () { console.log("Oops, something went wrong") });
        }
        getData();
    });

}($, VueModule, KoModule);