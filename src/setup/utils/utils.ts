export const appendScript = (scriptToAppend: string) => {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = true;
    document.body.appendChild(script);
}

export const removeScript = (scriptToremove: string) => {
    let allsuspects = document.getElementsByTagName("script");
    for (let i = allsuspects.length; i >= 0; i--) {
        // @ts-ignore
        if (allsuspects[i] && allsuspects[i].getAttribute("src") !== null && allsuspects[i].getAttribute("src").indexOf(`${scriptToremove}`) !== -1) {
            // @ts-ignore
            allsuspects[i].parentNode.removeChild(allsuspects[i])
        }
    }
}

export function getValueFromPattern(pattern: string, lastnum: number) {
    let tmp;
    let sharp_val = 1 + pattern.slice(pattern.indexOf('#')).replaceAll('#', '0');
    tmp = parseInt(sharp_val) + lastnum + 1;
    tmp = tmp.toString().slice(1);
    return pattern.slice(0, pattern.indexOf('#')) + tmp
}
