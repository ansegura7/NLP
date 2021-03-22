# Natural Language Processing
Natural Language Processing project with Python frameworks. NLP is a discipline where computer science, artificial intelligence and cognitive logic are intercepted, with the objective that machines can read and understand our language for decision making.

![NLP Header](https://raw.githubusercontent.com/ansegura7/NLP/master/image/header.jpg)

## Examples
<details open>
<summary>1. <a href="https://ansegura7.github.io/NLP/pages/NLP_SpaCy.html" >NLP with spaCy</a></summary>
<ul>
	<li>Read natural text of a book in Spanish</li>
	<li>Create a NLP model with spaCy</li>
	<li>Working with POS, NES and sentences</li>
</ul>
</details>
<details open>
<summary>2. <a href="https://ansegura7.github.io/NLP/pages/NLP_SemanticEnrich.html" >Semantic Enrichment of Entities</a></summary>
<ul>
	<li>Semantic Enrichment</li>
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
	<li>Tokenize and remove Stopwords</li>
	<li>Create a Word2Vec model</li>
	<li>Plot similars words</li>
	<li>Export similarity between the words</li>
</ul>
</details>
<details open>
<summary>5. <a href="https://ansegura7.github.io/NLP/pages/NLP_Network.html" >Relationship between Words</a></summary>
<ul>
	<li>Networks and Force System</li>
	<li>d3.js</li>
</ul>
</details>

## Data
Books in plain text, both in English and Spanish. The enrichment of the entities is done from DBpedia.

## Python Dependencies
``` console
    conda install -c conda-forge spacy
    python -m spacy download en
    python -m spacy download es
    conda install -c conda-forge sparqlwrapper
    pip install pyspellchecker
    conda install -c anaconda gensim
    conda install -c conda-forge wordcloud
```

## Contributing and Feedback
Any kind of feedback/criticism would be greatly appreciated (algorithm design, documentation, improvement ideas, spelling mistakes, etc...).

## Authors
- Created by Andrés Segura Tinoco
- Created on June 04, 2019

## License
This project is licensed under the terms of the MIT license.

## Acknowledgments
I would like to thank <a href="http://www.gutenberg.org" target="_blank" >Project Gutenberg</a> for sharing the books in English and <a href="https://norvig.com/" target="_blank" >Peter Norvig</a> for the spell checker algorithm.
