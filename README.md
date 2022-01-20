# NLP Course
![version](https://img.shields.io/badge/version-Pro-blue)
![release](https://img.shields.io/badge/release-1.1.0-blue)
![language](https://img.shields.io/badge/language-Python_3.7%7C3.8-brightgreen)
![last-update](https://img.shields.io/badge/last_update-1/21/2022-orange)
![last-update](https://img.shields.io/badge/license-MIT-orange)

Free hands-on course with the implementation (in Python) and description of several Natural Language Processing (NLP) algorithms and techniques, on several modern platforms and libraries.

Although it is not intended to have the formal rigor of a book, we tried to be as faithful as possible to the original algorithms and methods, only adding variants, when these were necessary for didactic purposes.

## Quick Start
The best way to get the most out of this course is to carefully read each selected problem, try to think of a possible solution (language independent) and then look at the proposed Python code and try to reproduce it in your favorite IDE. If you already have knowledge of the Python language, then you can go directly to programming your solution and then compare it with the one proposed in the course.

If you want to play with these notebooks online without having to install any library or configure hardware, you can use the following service:
- <a href="https://colab.research.google.com/github/ansegura7/NLP/blob/master/" target="_blank"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

## What is NLP?
Natural Language Processing project with Python frameworks. NLP is a discipline where computer science, artificial intelligence and cognitive logic are intercepted, with the objective that machines can read and understand our language for decision making.

![NLP Header](https://raw.githubusercontent.com/ansegura7/NLP/master/image/header.jpg)

## Contents
<details open>
<summary>1. <a href="https://ansegura7.github.io/NLP/pages/NLP_SpaCy.html" >NLP with spaCy</a></summary>
<ul>
	<li>Read natural text of a book in Spanish</li>
	<li>Create a NLP model with spaCy</li>
	<li>Working with POS, NER and sentences</li>
</ul>
</details>
<details open>
<summary>2. <a href="https://ansegura7.github.io/NLP/pages/NLP_SemanticEnrich.html" >Semantic Enrichment of Entities</a></summary>
<ul>
	<li>Semantic enrichment</li>
	<li>SPARQL</li>
	<li>DBpedia</li>
</ul>
</details>
<details open>
<summary>3. <a href="https://ansegura7.github.io/NLP/pages/NLP_SpellChecker.html" >Spell Checker/Corrector</a></summary>
<ul>
	<li>Spell Checker from scratch</li>
	<li>Spell Checker using PySpellChecker class</li>
</ul>
</details>
<details open>
<summary>4. <a href="https://ansegura7.github.io/NLP/pages/NLP_Word2Vec.html" >Word Embedding with Gensim</a></summary>
<ul>
	<li>Read natural text of a book in English</li>
	<li>Tokenize and remove stopwords</li>
	<li>Create a Word2Vec model (CBOW)</li>
	<li>Plot similars words</li>
	<li>Export similarity between the words</li>
</ul>
</details>
<details open>
<summary>5. <a href="https://ansegura7.github.io/NLP/pages/NLP_Network.html" >Relationship between Words</a></summary>
<ul>
	<li>Networks and force system</li>
	<li>d3.js</li>
</ul>
</details>
<details open>
<summary>6. <a href="https://ansegura7.github.io/NLP/pages/NLP_Stanza.html" >Stanza - Stanford CoreNLP</a></summary>
<ul>
	<li>Stanza text processing</li>
	<li>Stanford CoreNLP interface</li>
</ul>
</details>

## Data
Books in plain text, both in English and Spanish. The enrichment of the entities is done from DBpedia.

## Python Dependencies
``` console
    conda install -c conda-forge spacy
    python -m spacy download en_core_web_sm
    python -m spacy download es_core_news_sm
    conda install -c conda-forge sparqlwrapper
    pip install pyspellchecker
    conda install -c anaconda gensim
    conda install -c conda-forge wordcloud
	conda install -c conda-forge stanza
```

## Software Version
- Python 3.8.5
- spaCy 3.0.5
- Gensim 4.0.1
- Stanza 1.2.3

## Contributing and Feedback
Any kind of feedback/suggestions would be greatly appreciated (algorithm design, documentation, improvement ideas, spelling mistakes, etc...). If you want to make a contribution to the course you can do it through a PR.

## Author
- Created by Andrés Segura Tinoco
- Created on June 04, 2019

## License
This project is licensed under the terms of the <a href="https://github.com/ansegura7/NLP/blob/master/LICENSE">MIT license</a>.

## Acknowledgments
I would like to thank <a href="http://www.gutenberg.org" target="_blank" >Project Gutenberg</a> for sharing the books in English and <a href="https://norvig.com/" target="_blank" >Peter Norvig</a> for the spell checker algorithm.
