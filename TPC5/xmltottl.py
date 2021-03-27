import xml.etree.ElementTree as ET
import codecs
import os

tree = ET.parse('./git/PRC2021/TPC5/jcrpubs.xml')
root = tree.getroot()

f = codecs.open("./git/PRC2021/TPC5/jcrpubs.ttl", "a", "utf-8-sig")

def write_header(f,child):
    f.write('### nuno-aac.github.io/ontologias/jcrpubs#' + child.attrib['id'] + '\n')
    f.write(':' + child.attrib['id'] + ' rdf:type owl:NamedIndividual ,\n')
    f.write('       :' + child.tag.capitalize() + ';\n')

for child in root:
    write_header(f,child)
    for child2 in child:
        if child2.tag == 'author' or child2.tag == 'editor':
            f.write('   :' + child2.tag + ' :' + child2.attrib['id'] + ';\n')
        elif child2.tag == 'author-ref' or child2.tag == 'editor-ref':
            tag = child2.tag[:-4]
            f.write('   :' + tag + ' :' + child2.attrib['authorid'] + ';\n')
        else:
            f.write('   :' + child2.tag + ' "' + child2.text + '";\n')
    f.seek(-3,os.SEEK_CUR)        
    f.write('.\n')

for author in root.iter('author'):
    write_header(f,author)
    f.write('   :name "' + author.text + '".\n\n')

for editor in root.iter('editor'):
    write_header(f,editor)
    f.write('   :name "' + editor.text + '".\n\n')