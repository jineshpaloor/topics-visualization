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
            console.log(topic_id);
            render_pie_chart(topic_id);
        });
    }

    // define the init function (Implementation)
    var init = function () {
        $.getJSON("topics.json", function(doc_topics) {
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

/** This will make it possible to override config before calling implementation */
})();
