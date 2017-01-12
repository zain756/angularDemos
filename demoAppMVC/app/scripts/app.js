//-- publisher class -- 
function Publisher() { 
    this.subscribers = []; 
};

Publisher.prototype.deliver = function(data) { 
    this.subscribers.forEach(function(fn) { fn(data); }); 
};


//-- subscribe method to all existing objects 
Function.prototype.subscribe = function(publisher) { 
    var that = this; 
    var alreadyExists = publisher.subscribers.some(function(el) { 
        if (el === that) { 
            return; 
        } 
    });

    if (!alreadyExists) { 
        publisher.subscribers.push(this); 
    } 
    return this; 
};

var view = {

    init: function() { 
        this.name = $("#name"); 
        this.addButton = $("#addButton"); 
        this.list = $("#list");

        this.addButton.click(function() { 
            controller.addItem(view.name.val()); 
        }); 
    },

    appendItemToList: function(item) { 
        this.list.append($("<li>").text(item)); 
    } 
};

var model = {

    itemAddedEvent: new Publisher(),

    submitNewItem: function(item) { 
        //$.getJSON("/home/addnewitem/" + escape(item), null, this.submitNewItemCallback); 
        var data = {};
        data.result="testresponse";
        this.submitNewItemCallback(data);
    },

    submitNewItemCallback: function(data) { 
        model.itemAddedEvent.deliver(data.result); 
    } 
};

var controller = {

    addItem: function(item) { 
    	console.log(item);
        var valueToDisplay = 'entered: ' + item; 
        view.appendItemToList(valueToDisplay); 
        model.submitNewItem(item); 
    },

    serverItemAdded: function(item) { 
        view.appendItemToList(item); 
    },

    init: function() { 
        this.serverItemAdded.subscribe(model.itemAddedEvent); 
    } 
};

$(document).ready(function() { 
    view.init(); 
    controller.init(); 
});
