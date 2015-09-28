        $(document).ready(function(){
            var topics = {};

            $.getJSON("topics.json", function(doc_topics) {
                console.log(doc_topics); // this will show the info it in firebug console
                topics = doc_topics; 
                render_topics();
                render_pie_chart('topic0');
            });
           
            function render_pie_chart(topic_no) {
                console.log("loading ", topic_no);
                var chart = c3.generate({
                    data: {
                        // iris data from R
                        columns: topics[topic_no],
                        type : 'pie',
                        onclick: function (d, i) { console.log("onclick", d, i); },
                        //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                        //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
                    }
                });
                $("#chart-title").text(topic_no);
            }

            function render_topics() {
                var table_body = "";
                $.each(topics, function(k, v){
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

        });
