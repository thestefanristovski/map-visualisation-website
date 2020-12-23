//Stefan Ristovski, Andrieu Girard, Mathieu Ouvrard

//NB: List was created by applying xslAutoComplete to CountriesTP, we tried to automatically import those results into an
//array but it didn't work. Nevertheless, the xsl file used is in this folder.
var base= ['AW', 'AF', 'AO', 'AI', 'AX', 'AL', 'AD', 'AE', 'AR', 'AM', 'AS', 'AQ', 'TF', 'AG', 'AU', 'AT', 'AZ', 'BI', 'BE', 'BJ', 'BF', 'BD', 'BG', 'BH', 'BS', 'BA', 'BL', 'BY', 'BZ', 'BM', 'BO', 'BR', 'BB', 'BN', 'BT', 'BV', 'BW', 'CF', 'CA', 'CC', 'CH', 'CL', 'CN', 'CI', 'CM', 'CD', 'CG', 'CK', 'CO', 'KM', 'CV', 'CR', 'CU', 'CW', 'CX', 'KY', 'CY', 'CZ', 'DE', 'DJ', 'DM', 'DK', 'DO', 'DZ', 'EC', 'EG', 'ER', 'EH', 'ES', 'EE', 'ET', 'FI', 'FJ', 'FK', 'FR', 'FO', 'FM', 'GA', 'GB', 'GE', 'GG', 'GH', 'GI', 'GN', 'GP', 'GM', 'GW', 'GQ', 'GR', 'GD', 'GL', 'GT', 'GF', 'GU', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IM', 'IN', 'IO', 'IE', 'IR', 'IQ', 'IS', 'IL', 'IT', 'JM', 'JE', 'JO', 'JP', 'KZ', 'KE', 'KG', 'KH', 'KI', 'KN', 'KR', 'XK', 'KW', 'LA', 'LB', 'LR', 'LY', 'LC', 'LI', 'LK', 'LS', 'LT', 'LU', 'LV', 'MO', 'MF', 'MA', 'MC', 'MD', 'MG', 'MV', 'MX', 'MH', 'MK', 'ML', 'MT', 'MM', 'ME', 'MN', 'MP', 'MZ', 'MR', 'MS', 'MQ', 'MU', 'MW', 'MY', 'YT', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NU', 'NL', 'NO', 'NP', 'NR', 'NZ', 'OM', 'PK', 'PA', 'PN', 'PE', 'PH', 'PW', 'PG', 'PL', 'PR', 'KP', 'PT', 'PY', 'PS', 'PF', 'QA', 'RE', 'RO', 'RU', 'RW', 'SA', 'SD', 'SN', 'SG', 'GS', 'SJ', 'SB', 'SL', 'SV', 'SM', 'SO', 'PM', 'RS', 'SS', 'ST', 'SR', 'SK', 'SI', 'SE', 'SZ', 'SX', 'SC', 'SY', 'TC', 'TD', 'TG', 'TH', 'TJ', 'TK', 'TM', 'TL', 'TO', 'TT', 'TN', 'TR', 'TV', 'TW', 'TZ', 'UG', 'UA', 'UM', 'UY', 'US', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'ZA', 'ZM', 'ZW'];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function that auto completes text field if only one possible result left and shows recommended codes based on input
//NB: Because we use 2 letter codes, autocorrect can almost never auto complete the text field, since there are
//multiple choices for every letter.

function check(field) {
    var name = field.value;
    var l = name.length;
    var idx = base.indexOf(name);
    if(idx == -1) {
    var tempo = base.filter(function(x) {
      return x.substr(0, l) == name;
    });
    if(tempo.length != 1) 
    {   
        if(tempo.length < 25) 
        {   
            var t = window.document.getElementById("recs");
            t.innerHTML = "Recommendations:" + tempo;
        }
        return;
    }
    name = tempo[0];    
    field.value = name;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function that enables clicks on shapes
function setClickable5() {
    var tab = window.document.getElementById("lesFormes").getElementsByTagName("g")[0].children;
    for (var i=0, length = tab.length; i<length; i++) {
        tab[i].addEventListener("click", clickable)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function displays name of shape (event listener)
function clickable() {
    var t = window.document.getElementById("shape_name");
    t.innerHTML = this.getAttribute("title");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function that enables clicks on World Map
function setClickable7() {
        var tab = window.document.getElementsByTagName("g")[0].children;
        for (var i=0, length = tab.length; i<length; i++) {
            tab[i].addEventListener("click", clickable2)
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function displays name of country (event listener)
function clickable2() {
    var t = window.document.getElementById("shape_name");
    t.innerHTML = this.getAttribute("countryname");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function that enables mouse over on World Map
function setMouse8() {
    var tab = window.document.getElementsByTagName("g")[0].children;
    for (var i=0, length = tab.length; i<length; i++) {
        tab[i].addEventListener("mouseenter", onEntry);
        tab[i].addEventListener("mouseleave", onExit);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function colours country hovered over and displays table of information (event listener)
function onEntry() {
    var url = "https://restcountries.eu/rest/v2/alpha/"
    var newurl = url + this.getAttribute("id");
    var file = chargerHttpJSON(newurl);
    var currency = file['currencies'][0]['name'];
    Bouton8_XMLcountry('countriesTP.xml','xslbutton9.xsl',this.getAttribute("id"), 'ul', currency);
    this.style.fill="red";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function brings original color of country after mouse leaves (event listener)
function onExit() {
    this.style.fill="#CCCCCC";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function that puts image on page
function setSVG(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_image");
    elementHtmlARemplir.innerHTML = nom;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function that reads image from svg file
function Bouton4_Image(svgFile) {
    var file = chargerHttpXML(svgFile);
    var s = new XMLSerializer();
    var str = s.serializeToString(file);
    setSVG(str);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function that creates table of information for country on World Map
function Bouton8_XMLcountry(xmlDocumentUrl, xslDocumentUrl, codeX, newElementName, currencyX) {

    var xsltProcessor = new XSLTProcessor();

   // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    xsltProcessor.setParameter(null, 'code', codeX);
    xsltProcessor.setParameter(null, 'currency', currencyX);

    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier élément fils du parent
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier élément "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName(newElementName)[0];

    // Remplacement de l'élément
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function that returns name and capital of country with code as input
function Bouton3_XMLcountry(xmlDocumentUrl, xslDocumentUrl, codeX, newElementName) {

    var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    xsltProcessor.setParameter(null, 'code', codeX);

    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier élément fils du parent
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier élément "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName(newElementName)[0];

    // Remplacement de l'élément
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Blue Background
function BckBlue() {
    document.getElementsByTagName("body")[0].style.backgroundColor= "blue";
    document.getElementById("myButton1").style.color = "white";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//White Background
function BckWhite() {
    document.getElementsByTagName("body")[0].style.backgroundColor= "white";
    document.getElementById("myButton1").style.color = "black";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recupererPremierEnfantDeTypeNode(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'élement avec l'id "nom" avec la chaine de caractéres en paramètre	  
function setNom(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_nom_a_remplacer");
    elementHtmlARemplir.innerHTML = nom;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant à l'URL relative donné dans le paramètreet le retourne
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML à l'aide de XMLHttpRequest synchrone (le 3° paramètre est défini à false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant à l'URL donnée en paramètre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON à l'aide de XMLHttpRequest synchrone (le 3° paramètre est défini à false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton2_ajaxBibliographie(xmlDocumentUrl, xslDocumentUrl, newElementName) {

    var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier élément fils du parent
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier élément "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName(newElementName)[0];

    // Remplacement de l'élément
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton3_ajaxEmployees(xmlDocumentUrl) {


    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    //extraction des noms à partir du document XML (avec une feuille de style ou en javascript)
    var lesNoms = xmlDocument.getElementsByTagName("LastName");

    // Parcours de la liste des noms avec une boucle for et 
    // construction d'une chaine de charactères contenant les noms séparés par des espaces 
    // Pour avoir la longueur d'une liste : attribut 'length'
    // Accès au texte d'un noeud "LastName" : NOM_NOEUD.firstChild.nodeValue
    var chaineDesNoms = "";
    for (i = 0; i < lesNoms.length; i++) {
        if (i > 0) {
            chaineDesNoms = chaineDesNoms + ", ";
        }
        chaineDesNoms = chaineDesNoms + lesNoms[i].firstChild.nodeValue + " ";
    }


    // Appel (ou recopie) de la fonction setNom(...) ou bien autre façon de modifier le texte de l'élément "span"
    setNom(chaineDesNoms);



}
