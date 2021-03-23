import xml.etree.ElementTree as ET

import os
cwd = os.getcwd()
print(cwd)

tree = ET.parse('./git/PRC2021/TPC5/jcrpubs.xml')
root = tree.getroot()

for child in root:
    for child2 in child:
        print(child2.tag, child2.attrib)