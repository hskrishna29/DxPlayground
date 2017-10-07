
Vue.component("list-view",
    {
        props: ["items"], // parameters
        template: "#list-template",
        methods: {
            itemClick: function (item, index) {
                this.$emit("itemclicked", item, index);
            },
            getClass: function (status) {
                return {
                    'glyphicon glyphicon-play': status.toLowerCase() === "active" || status.toLowerCase() === "enabled",
                    'glyphicon glyphicon-pause': status.toLowerCase() === "paused"
                }
            }
        },
        computed: {

        }
    });

Vue.component("choose-items",
    {
        props: ["items"],
        template: "#choose-items",
        data: function () {
            return {
                searchTerm: "",
                status: "All"
            }
        },
        methods: {
            setStatus: function (status) {
                this.status = status;
            },
            select: function (item) {
                item.selected = true;
            },
            unselect: function (item) {
                item.selected = false;
            },
            selected: function (selected) {
                return this.items.filter(function (item) {
                    return item.selected === selected;
                });
            },
            bulkSelect: function (selected) {
                $.each(this.items,
                    function (index, item) {
                        item.selected = selected;
                    });
            },
            selectAll: function () {
                $.each(this.getSelectable,
                    function (item) {
                        item.selected = true;
                    });
            },
            unselectAll: function () {
                this.getSelected = this.selectedItems.filter(function (item) {
                    item.selected = false;
                });
            },
            selectableItems: function () {
                var self = this;
                var search = this.searchTerm !== "" && this.searchTerm.length > 2;
                return self.items.filter(function (item) {
                    var isActive = true;
                    var includeItem = true;
                    if (search)
                        includeItem = item.text.toLowerCase().indexOf(self.searchTerm.toLowerCase()) >= 0;

                    if (self.status === "All Active") {
                        isActive =
                            item.status.toLowerCase() === "active" || item.status.toLowerCase() === "enabled";
                    }
                    return item.selected === false && isActive && includeItem;
                });
            }
        },
        watch: {},
        computed: {
            getselectableItems: function () {
                var self = this;

                var search = this.searchTerm !== "" && this.searchTerm.length > 2;
                return self.items.filter(function (item) {
                    var isActive = true;
                    var includeItem = true;
                    if (search)
                        includeItem = item.text.toLowerCase().indexOf(self.searchTerm.toLowerCase()) >= 0;

                    if (self.status === "All Active") {
                        isActive =
                            item.status.toLowerCase() === "active" || item.status.toLowerCase() === "enabled";
                    }
                    return item.selected === false && isActive && includeItem;
                });
                
            }
        }
    });


var temp = [];
var vue = new Vue({
    el: "#page-container",
    data: {
        items: []
    },
    mounted: function () {
        var self = this;
        $.getJSON("../Content/Resources/campaigns.json",
            function (data) {
                var list = [];
                list = data.Campaigns.map(function (item) {
                    return { id: item.SearchEngineCampaignId, text: item.CampaignName, selected: false, status: item.CampaignStatus };
                });
                
                self.items = list;
            }).fail(function () { console.log("Oops, something went wrong") });


        $(".list-container").slimScroll({
            height: "400px"
        });
    },

});