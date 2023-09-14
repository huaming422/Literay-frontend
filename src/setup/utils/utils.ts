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

export function parseDicomDate(s:string)
{
  if(!s) {return null}
  let y = parseInt(s.substr(0, 4), 10);
  let m = parseInt(s.substr(4, 2), 10) - 1;
  let d = parseInt(s.substr(6, 2), 10);

  if (y == null || m == null || d == null ||
      !isFinite(y) || !isFinite(m) || !isFinite(d))
  {
    return null;
  }

  if (y < 1900 || y > 2100 ||
      m < 0 || m >= 12 ||
      d <= 0 || d >= 32)
  {
    return null;
  }

  return new Date(y, m, d);
}

export function alphabetically(field: string, ascending: any) {
    return function (a: any, b: any) {
      let avalue = a[field];
      let bvalue = b[field];

      // equal items sort equally
      if (avalue === bvalue) {
        return 0;
      }

      // nulls sort avaluefter anything else
      if (avalue === null) {
        return 1;
      }
      if (bvalue === null) {
        return -1;
      }
      if (avalue === undefined) {
        return 1;
      }
      if (bvalue === undefined) {
        return -1;
      }
      try {
        avalue = parseFloat(avalue);
        bvalue = parseFloat(bvalue);
      } catch (error) {
      }

      if (isNaN(avalue) || isNaN(bvalue)) {
        avalue = a[field].toLowerCase();
        bvalue = b[field].toLowerCase();
      }

      // otherwise, if we're ascending, lowest sorts first
      if (ascending) {
        return avalue < bvalue ? -1 : 1;
      }

      // if descending, highest sorts first
      return avalue < bvalue ? 1 : -1;
    };
  }

