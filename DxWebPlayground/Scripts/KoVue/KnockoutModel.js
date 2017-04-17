
// Knockout

var CampaignViewModel = function (name) {
    var self = this;
    self.selected = ko.observable(false);
    self.name = name;

    self.select = function (selected) {
        self.selected(selected);
    }
}
var MainViewModel = function () {
    var self = this;
    self.ready = ko.observable(false);
    self.bulkPerformance = ko.observable(0);
    self.campaigns = ko.observableArray([]);
    self.bulkSelect = function (selected) {
        var t0 = performance.now();
        $.each(self.campaigns(), function (index, item) {
            item.selected(selected);
        });
        var t1 = performance.now();
        self.bulkPerformance(parseInt(t1 - t0));
    }
    self.selectedCampaigns = ko.computed(function () {
        var selected = self.campaigns().filter(function (campaign) {
            return campaign.selected() === true;
        });
        return selected.length;
    });
}

var KoModule = function($, mainModule) {
    $(document).ready(function () {

        var koCallback = function (data) {
            var t0 = performance.now();
            var model = new MainViewModel();
            var campaignsList = [];

            $.each(data.Campaigns, function (index, item) {
                campaignsList.push(new CampaignViewModel(item.CampaignName));
            });
            model.campaigns(campaignsList);
            model.ready(true);
            ko.applyBindings(model, $("#campaigns-ko")[0]);

            var t1 = performance.now();
            model.bulkPerformance(parseInt(t1 - t0));
            $(".campaigns-container").slimScroll({
                height: "400px"
            });
        }
        mainModule.getData(koCallback);
    });
}($, MainModule);

