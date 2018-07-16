function findLangFromDomain() {
    var match = window.location.hostname.match("([^\.]+)\.khantribute\.localgrid\.de")
    if(match === null) {
        return 'sv-SE'; // Default
    } else {
        var protoLangcode = match[1]; // "de" or "svse"
        // we need "sv-SE"
        if(protoLangcode.length <= 2) {
            return protoLangcode
        } else { // "svse", need to convert to "sv-SE"
            return /* sv */ protoLangcode.slice(0,2) + "-" + protoLangcode.slice(2).toUpperCase();
        }
    }
}

export default findLangFromDomain;