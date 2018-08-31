import katex from "katex";

export enum Format {
    BOLD,
    ITALIC,
    KATEX,
    STRIKE
};

type Token = {
    formats: Set<Format>,
    content: string,
    url: string
}

export function parseString(s: string): Token[] {
    let chars = s.replace(/(\\n)+/g, "\n").replace(/\!\[\]\(.+?\)/g, "\\[IMAGE]").replace(/\[\[☃.+?\]\]/, "\\[INTERACTIVE ELEMENT]").split("");
    
    let formats: Set<Format> = new Set();
    let tokens: Token[] = [{
        content: "",
        url: "",
        formats: new Set(formats)
    }];
    // Pre-extract the links
    let links: Array<{url: string, text: string, length: number}> = [];
    s.replace(/\[(.*?)\]\((.*?)\)/, (match, url, text) => {
        links.push({
            url: url,
            text: text,
            length: match.length
        });
        return "";
    });

    while (chars.length > 0) {
        let nFormat: Format;
        switch (chars[0]) {
            case "*":
                nFormat = Format.ITALIC;
                if (chars[1] === "*") {
                    chars.shift();
                    nFormat = Format.BOLD;
                }
                break;
            case "$":
                nFormat = Format.KATEX;
                break;
            case "~":
                if (chars[1] === "~") {
                    chars.shift();
                    nFormat = Format.STRIKE;
                }
                break;
            case "!":
                let link = links.shift();

                tokens.push({
                    content: link.text,
                    url: link.url,
                    formats: new Set(formats)
                });

                chars = chars.slice(link.length);
                break;
            case "\\":
                chars.shift();

                if (formats.has(Format.KATEX)) {
                    tokens[tokens.length - 1].content += chars.shift();
                }
            default:
                tokens[tokens.length - 1].content += chars[0];
        }

        chars.shift();

        if (nFormat != null) {
            if (formats.has(nFormat)) {
                formats.delete(nFormat);
            } else {
                formats.add(nFormat);
            }

            tokens.push({
                content: "",
                url: "",
                formats: new Set(formats)
            });
        }
    }

    return tokens.filter(({content}) => !!content.length);
}

export function toHTML(tokens: Token[]): string {
    return tokens.map(({formats, content, url}) => {
        let start = "",
            end = "";
        
        if (formats.has(Format.BOLD)) {
            start += "<b>";
            end = "</b>" + end;
        }
        if (formats.has(Format.ITALIC)) {
            start += "<i>";
            end = "</i>" + end;
        }
        if (formats.has(Format.STRIKE)) {
            start += "<del>";
            end = "</del>" + end;
        }
        
        if (formats.has(Format.KATEX)) {
            return start + katex.renderToString(content, {
                throwOnError: false
            }) + end;
        } else if (url.length) {
            return `${start}<a href=${url}>${content}</a>${end}`;
        } else {
            return start + content + end;
        }
    }).join("");
}