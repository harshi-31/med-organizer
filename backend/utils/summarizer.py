import spacy
import networkx as nx
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

nlp = spacy.load('en_core_web_sm')

def sentence_similarity(sent1, sent2):
    return sent1.similarity(sent2)

def summarize_text(text, top_n=3):
    doc = nlp(text)
    sentences = list(doc.sents)
    if len(sentences) <= top_n:
        return text

    # Compute similarity matrix
    sim_matrix = np.zeros((len(sentences), len(sentences)))
    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if i != j:
                sim_matrix[i][j] = sentence_similarity(sentences[i], sentences[j])

    # Build graph and apply PageRank
    nx_graph = nx.from_numpy_array(sim_matrix)
    scores = nx.pagerank(nx_graph)

    # Rank sentences and return top ones
    ranked_sentences = sorted(((scores[i], s.text) for i, s in enumerate(sentences)), reverse=True)
    summary = ' '.join([sent for _, sent in ranked_sentences[:top_n]])
    return summary

