import os
import gensim

# Sample Topic
# 0.039*engineer + 0.033*medical + 0.032*life + 0.032*museum + 0.027*role + 0.025*service + 0.024*management + 0.023*born + 0.023*held + 0.022*location

def process_topic(topic):
    return sorted(
        [t.split('*') for t in topic.split('+')],
        key=lambda x: x[0],
        reverse=True)

def get_topics(lda_path):
    lda = gensim.models.LdaModel.load(lda_path)
    
    f = open('electrical-topics.json', 'w')
    f.write('{\n')
    for topic_no in xrange(lda.num_topics):
        topic = lda.print_topic(topic_no)
        word_weight = process_topic(topic)

        total_weight = sum([float(s[0]) for s in word_weight])

        content = [[w, round(float(wt)/total_weight * 100, 2)] for wt, w in word_weight]
        print content
        f.write("topic" + str(topic_no) + ": " + str(content) + ",\n")
    f.write('}')
    f.close()

def get_wiki_files_list(docs_path):
    f = open('wiki_files.json', 'w')
    f.write('[\n')
    for fl in os.listdir(docs_path):
        print fl
        if fl[0] == '.':
            continue
        f.write(fl + ',\n')
    f.write(']')
    f.close()


if __name__ == '__main__':
    #get_topics('/Users/jineshn/Code/python/gensim_scripts/backup_logs/wiki_normal.lda')
    get_wiki_files_list('/Users/jineshn/Code/python/gensim_scripts/data/wiki_download_dir')
