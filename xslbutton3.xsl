<?xml version="1.0" encoding="UTF-8"?>
<!-- Style Sheet for displaying the country and capital of a country code -->
<!-- Stefan Ristovski, Andrieu Girard, Mathieu Ouvrard -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:param name="code"/>
	<xsl:output method="html"/>

	<xsl:template match="/">
		<html>
			<body style="background-color:white;">
				<ul>
					<xsl:for-each select="//country">
						<xsl:if test="current()/codes[cca2=$code]">
	      					<xsl:value-of select="current()/name/official"/>  - <xsl:value-of select="current()/capital"/>
	    				</xsl:if>
					</xsl:for-each>
				</ul>
 			</body>
		</html>

	</xsl:template>

	
</xsl:stylesheet>
