import xml.etree.ElementTree as ET

tree = ET.parse('./git/PRC2021/TPC5/jcrpubs.xml')
root = tree.getroot()

f = open("./git/PRC2021/TPC5/jcrpubs.ttl", "a")

for child in root:
    f.write('### nuno-aac.github.io/ontologias/jcrpubs#' + child.attrib['id'] + '\n')
    f.write(':' + child.attrib['id'] + ' rdf:type owl:NamedIndividual ,\n')
    f.write('       :' + child.tag + '\n')
    for child2 in child:

        if child2.tag == 'author' or child2.tag == 'editor':
            f.write('   :' + child2.tag + ' :' + child2.attrib['id'] + '\n')
        elif child2.tag == 'author-ref' or child2.tag == 'editor-ref':
            tag = child2.tag[:-4]
            f.write('   :' + tag + ' :' + child2.attrib['authorid'] + '\n')
        else:
            f.write('   :' + child2.tag + ' "' + child2.text + '"\n')
    f.write('\n')