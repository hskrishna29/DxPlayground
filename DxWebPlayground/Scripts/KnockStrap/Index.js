var IndexModule = function () {

    var MatchTypesViewModel = function() {
        var self = this;
        self.title = "Match Types";
        self.keywords = ko.observable();
        self.keywordsArray = ko.observableArray([]);

        self.generatedKeywords = ko.observable("");
        var unique = function (array) {
            return $.grep(array, function (el, index) {
                return index === $.inArray(el, array);
            });
        }

        self.generateKeywords = function(operation) {
            var array = self.keywordsArray();
            var newArray = $.map(array, operation);
            return newArray;
        }


        self.broadMatchType = function() {
            var operation = function(item) {
                return item;
            };
            return self.generateKeywords(operation);
        }
        self.broadModifiedMatchType = function() {
            var operation = function(item) {
                return "+" + item;
            };
            return self.generateKeywords(operation);
        }
        self.phraseMatchType = function() {
            var operation = function(item) {
                return "\"" + item + "\"";
            };
            return self.generateKeywords(operation);
        }
        self.exactMatchType = function() {
            var operation = function(item) {
                return "[" + item + "]";
            };
            return self.generateKeywords(operation);
        }

        self.allMatchTypes = function () {
            var array = [];
            array = array.concat(self.broadMatchType());
            array = array.concat(self.broadModifiedMatchType());
            array = array.concat(self.phraseMatchType());
            array = array.concat(self.exactMatchType());
            return array;
        }

        self.matchTypeHandler = {
            "all": self.allMatchTypes,
            "broad": self.broadMatchType,
            "broad-modified": self.broadModifiedMatchType,
            "phrase": self.phraseMatchType,
            "exact": self.exactMatchType
        }


        var generate = function () {
            var uniqueKeywords = unique(self.keywordsArray());
            self.keywordsArray(uniqueKeywords);
            if (self.matchTypes().length === 0) {
                self.generatedKeywords("");
                return;
            }

            var generatedArray = [];

            $.each(self.matchTypes(),
                function (index, item) {
                    generatedArray = generatedArray.concat(self.matchTypeHandler[item]());
                    // If all is selected, don't care about the other selections
                    if (item === "all")
                        return false;

                    return true;
                });

            var finalResult = generatedArray.join("\n");
            self.generatedKeywords(finalResult);
        }

        self.keywords.subscribe(function(data) {
            console.log(data);

            var array = data.split("\n").filter(function(e) {
                return $.trim(e) !== "";
            });

            self.keywordsArray(array);

            if (self.matchTypes().length > 0)
                generate();

        });
        self.matchTypes = ko.observableArray();

        self.matchTypes.subscribe(function () {
            generate();
        });
    }

    var AdgroupsViewModel = function() {
        var self = this;
        self.nodes = ko.observableArray([]);
        self.query = ko.observable("");
        self.filteredNodes = ko.computed(function () {
            if (self.query() === "")
                return self.nodes();


            var tempArray = ko.toJS(self.nodes());
            var f = tempArray.filter(function (item) {
                if (item.nodes === null)
                    return false;
                item.nodes = item.nodes.filter(function(innerItem) {
                    return innerItem.text.toLowerCase().includes(self.query());
                });

                return item.nodes.length > 0;
            });

            return f;
        });
        self.getTree = function() {
            $.getJSON("../Content/Resources/campaigns-tree.json",
                function(data) {
                    var treeNodes = data.campaigns;
                    self.nodes(treeNodes);
                    //$('#tree').treeview({ data: tree });
                }).fail(function() { console.log("Oops, something went wrong") });
        }();
        self.data = [];
    }

    var AddKeywordWizardViewModel = function() {
        var self = this;
        self.step1ViewModel = new MatchTypesViewModel();
        self.step2ViewModel = new AdgroupsViewModel();

        self.enableAdgroupSelection = ko.computed(function() {
            return self.step1ViewModel.generatedKeywords() !== "";
        });
    }
    
    var ModalViewModel = function () {
        var self = this;

        self.modalDataViewModel = new AddKeywordWizardViewModel();
        self.modalTemplate = ko.observable("addkeyword-step1");
        self.modalVisible = ko.observable(false);

        self.show = function () {
            self.modalVisible(true);
        };

        self.next = function() {
            self.modalTemplate("addkeyword-step2");
        }

        self.back = function() {
            self.modalTemplate("addkeyword-step1");
        }
        self.add = function() {
            
        }
        self.modalSize = ko.observable('modal-lg');
    }

    $(function () {
        ko.applyBindings(new ModalViewModel());
    });
}();
