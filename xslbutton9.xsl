<?xml version="1.0" encoding="UTF-8"?>
<!-- Style Sheet for displaying Table od info from World Map -->
<!-- Stefan Ristovski, Andrieu Girard, Mathieu Ouvrard -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:param name="code"/>
	<xsl:param name="currency"/>
	<xsl:output method="html"/>

	<xsl:template match="/">
		<html>
			<body style="background-color:white;">
				<ul>
					<xsl:for-each select="//country">
						<xsl:if test="current()/codes[cca2=$code]">
							<table style="width:100%" border="3">
							<tr>
								<th>Drapeau</th>
								<th>Nom</th>
								<th>Capitale</th>
								<th>Monnaie</th>
							</tr>
							<tr>
								<th><img src="http://www.geonames.org/flags/x/{translate(codes/cca2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"/></th>
								<th><xsl:value-of select="current()/name/official"/></th>
								<th><xsl:value-of select="current()/capital"/></th>
								<th><xsl:value-of select="$currency"/></th>
							</tr>
	      				</table>
	    				</xsl:if>
					</xsl:for-each>
				</ul>
 			</body>
		</html>

	</xsl:template>

	
</xsl:stylesheet>
