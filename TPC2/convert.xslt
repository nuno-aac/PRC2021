<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xd="oxygenxml.com/ns/doc/xsl" exclude-result-prefixes="xd" version="1.0">

    <xd:doc scope="stylesheet">

        <xd:desc>

            <xd:p>
                <xd:b>Created on:</xd:b>
                Mar 2, 2021
            </xd:p>

            <xd:p>
                <xd:b>Author:</xd:b>
                Nuno Cunha
            </xd:p>

            <xd:p>Conversão de dataset Musica de XML para TTL</xd:p>

        </xd:desc>

    </xd:doc>


    <xsl:output method="text" encoding="UTF-8" indent="yes" />



    <xsl:template match="/">
        
        <xsl:apply-templates mode="obras" select="//obra">
            
        </xsl:apply-templates>
        
        <xsl:apply-templates mode="compositores" select="//compositor">
            
        </xsl:apply-templates>
        
        <xsl:apply-templates mode="instrumentos" select="//instrumento">
            
        </xsl:apply-templates>
        
        <xsl:apply-templates mode="partituras" select="//partitura">
            
        </xsl:apply-templates>
        
    </xsl:template>


    <xsl:template match="obra" mode="obras">
### nuno-aac.github.io/ontologias/musica#<xsl:value-of select="@id" />
:<xsl:value-of select="@id" /> rdf:type owl:NamedIndividual ,
        :Obra ;
    :titulo "<xsl:value-of select="titulo" />" ;
    :tipo "<xsl:value-of select="tipo" />" .

# -------------------------------------------
    
    </xsl:template>
    
    <xsl:template match="instrumento" mode ="instrumentos">
### nuno-aac.github.io/ontologias/musica#inst<xsl:value-of select="generate-id()" />
:inst<xsl:value-of select="generate-id()" /> rdf:type owl:NamedIndividual ,
        :Instrumento ;
    :designacao "<xsl:value-of select="./designacao" />" ;
    :tocaEm :<xsl:value-of select="../../@id" /> .
        
# -------------------------------------------
        
    </xsl:template>

    
    <xsl:template match="partitura" mode ="partituras">
### nuno-aac.github.io/ontologias/musica#<xsl:value-of select="@path" />
:<xsl:value-of select="@path" /> rdf:type owl:NamedIndividual ,
        :Partirura ;
    :partituraDe :inst<xsl:value-of select="generate-id(ancestor::instrumento)" /> ;
    :partituraTipo "<xsl:value-of select="@type" />" .
        
# -------------------------------------------
        
    </xsl:template>
    
    
    <xsl:template match="compositor" mode ="compositores">
### nuno-aac.github.io/ontologias/musica#comp<xsl:value-of select="generate-id()" />
:comp<xsl:value-of select="generate-id()" /> rdf:type owl:NamedIndividual ,
        :Compositor ;
    :compos :<xsl:value-of select="../@id" /> ;
    :nome "<xsl:value-of select="." />" .
        
# -------------------------------------------
        
    </xsl:template>



</xsl:stylesheet>