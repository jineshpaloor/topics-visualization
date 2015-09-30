/** This will be our global, topmost level namespace */
var NS = NS || { };

NS.ie = function(){ return navigator.userAgent.indexOf('MSIE') != -1; }

/** This is the skeleton for the module. Copy this to start with a new module */
NS.topics = (function () {
    // define some config (Settings)
    var config = {
        autoInvokeInit: false, // whether the init function must be invoked automatically when page loads
        topics: {}
    };

    function render_pie_chart(topic_no) {
        var chart = c3.generate({
            data: {
                // iris data from R
                columns: config.topics[topic_no],
                type : 'pie',
                // onclick: function (d, i) { console.log("onclick", d, i); },
                //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
        $("#chart-title").text(topic_no);
    }

    function render_topics() {
        var table_body = "";
        $.each(config.topics, function(k, v){
           table_body += "<tr id=" + k + " class='topic'><td>" + k + "</td><td>";
           v.forEach(function(item) {table_body +="<em><strong>" + item[0] + "</strong></em> <small>(" + item[1] + ") </small>"});
           table_body += "</td></tr>";
        });
        $("#topic-table tbody").html(table_body);
        register_topic_pie_chart();
    }

    function register_topic_pie_chart() {
        $(".topic").hover(function(){
            var topic_id = $(this).attr("id"); 
            render_pie_chart(topic_id);
        });
    }

    // define the init function (Implementation)
    var init = function () {
        $.getJSON("/static/json/topics.json", function(doc_topics) {
            config.topics = doc_topics; 
            render_topics();
            render_pie_chart('topic0');
        });
    };
    
    // return an object
    return {
        config: config,
        init: init
    };

})();

NS.documents_topics = (function () {
    // define some config (Settings)
    var config = {
        autoInvokeInit: false, // whether the init function must be invoked automatically when page loads
        files: {},
        topics: {},
        doc_topics: {}
    };

    function update_docs_dropdown_menu() {
        var li_menu = "";
        var doc_names = [];
        $.each(config.doc_topics, function(k, v){
            doc_names.push(k);
        });
        doc_names.sort();
        $.each(doc_names, function(k, v){
            li_menu += "<li class='wiki-document'><a href='#'>" + v + "</a></li>";
        });

        $("#documents-dropdown-menu").html(li_menu);
        register_dropdown_change();
    };

    function render_topic_pie_chart(topic_no) {
        var chart = c3.generate({
            bindto: '#topic-chart',
            data: {
                columns: config.topics[topic_no],
                type : 'pie',
                // onclick: function (d, i) { console.log("onclick", d, i); },
                //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
        $("#topic-title").text(topic_no);
    }

    function render_doc_pie_chart(doc_name) {
        var chart = c3.generate({
            bindto: document.getElementById('doc-chart'),//'#doc-chart',
            data: {
                columns: config.doc_topics[doc_name],
                type : 'pie',
                onclick: function (d, i) { 
                    render_topic_pie_chart('topic' + d["id"]);
                },
                //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
        $("#chart-title").text(doc_name);
        var topic_no = "topic" + config.doc_topics[doc_name][0][0];
        render_topic_pie_chart(topic_no) 
    }

    function register_dropdown_change() {
        $(".wiki-document").on("click", function(){
            var doc_name = $(this).text();
            render_doc_pie_chart(doc_name);
        });
    };

    // define the init function (Implementation)
    var init = function () {
        $.getJSON("/static/json/topics.json", function(topics) {
            config.topics = topics; 
        });

        $.getJSON("/static/json/wiki_files.json", function(file_names) {
            config.files = file_names; 
        });

        $.getJSON("/static/json/doc_topics.json", function(doc_topics) {
            config.doc_topics = doc_topics; 
            update_docs_dropdown_menu();
            render_doc_pie_chart(config.files[0]);
        });
    };
    
    // return an object
    return {
        config: config,
        init: init
    };
})();

NS.bbc_topics = (function () {
    // define some config (Settings)
    var config = {
        autoInvokeInit: false, // whether the init function must be invoked automatically when page loads
        topics: {}
    };

    function render_pie_chart(topic_no) {
        var chart = c3.generate({
            data: {
                // iris data from R
                columns: config.topics[topic_no],
                type : 'pie',
                // onclick: function (d, i) { console.log("onclick", d, i); },
                //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
        $("#chart-title").text(topic_no);
    }

    function render_topics() {
        var table_body = "";
        $.each(config.topics, function(k, v){
           table_body += "<tr id=" + k + " class='topic'><td>" + k + "</td><td>";
           v.forEach(function(item) {table_body +="<em><strong>" + item[0] + "</strong></em> <small>(" + item[1] + ") </small>"});
           table_body += "</td></tr>";
        });
        $("#topic-table tbody").html(table_body);
        register_topic_pie_chart();
    }

    function register_topic_pie_chart() {
        $(".topic").hover(function(){
            var topic_id = $(this).attr("id"); 
            render_pie_chart(topic_id);
        });
    }

    // define the init function (Implementation)
    var init = function () {
        $.getJSON("/static/json/bbc_topics.json", function(doc_topics) {
            config.topics = doc_topics; 
            render_topics();
            render_pie_chart('topic0');
        });
    };
    
    // return an object
    return {
        config: config,
        init: init
    };

})();

NS.bbc_documents_topics = (function () {
    // define some config (Settings)
    var config = {
        autoInvokeInit: false, // whether the init function must be invoked automatically when page loads
        files: {},
        topics: {},
        doc_topics: {}
    };

    function update_docs_dropdown_menu() {
        var li_menu = "";
        var doc_names = [];
        $.each(config.files, function(k, v){
            doc_names.push(k);
        });
        doc_names.sort();
        $.each(doc_names, function(k, v){
            li_menu += "<li class='wiki-document' value=" + config.files[v] + "><a href='#'>" + v + "</a></li>";
        });

        $("#documents-dropdown-menu").html(li_menu);
        register_dropdown_change();
    };

    function render_topic_pie_chart(topic_no) {
        var chart = c3.generate({
            bindto: '#topic-chart',
            data: {
                columns: config.topics[topic_no],
                type : 'pie',
                // onclick: function (d, i) { console.log("onclick", d, i); },
                //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
        $("#topic-title").text(topic_no);
    }

    function render_doc_pie_chart(doc_name) {
        var doc_title = config.files[doc_name];
        console.log(doc_name, doc_title, config.doc_topics);
        var chart = c3.generate({
            bindto: document.getElementById('doc-chart'),//'#doc-chart',
            data: {
                columns: config.doc_topics[doc_title],
                type : 'pie',
                onclick: function (d, i) { 
                    render_topic_pie_chart('topic' + d["id"]);
                },
                //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
        $("#chart-title").text(doc_name);
        var topic_no = "topic" + config.doc_topics[doc_title][0][0];
        render_topic_pie_chart(topic_no) 
    }

    function register_dropdown_change() {
        $(".wiki-document").on("click", function(){
            var doc_name = $(this).text();
            render_doc_pie_chart(doc_name);
        });
    };

    function init_doc_topics() {
        console.log("bbc doc topics..");
        $.getJSON("/static/json/bbc_doc_topics.json", function(doc_topics) {
            config.doc_topics = doc_topics; 
            render_doc_pie_chart("Ad sales boost Time Warner profit");
        });
    };

    function init_file_names() {
        $.getJSON("/static/json/bbc_files.json", function(file_names) {
            config.files = file_names; 
            update_docs_dropdown_menu();
            init_doc_topics()
        });
    };

    // define the init function (Implementation)
    var init = function () {
        $.getJSON("/static/json/bbc_topics.json", function(topics) {
            config.topics = topics; 
            init_file_names();
        });

    };
    
    // return an object
    return {
        config: config,
        init: init
    };
})();
