function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

function getNowAge(type)
{
    var year1, mon1, day1;
    var year2, mon2, day2;
    var year, mon, day;
    var bornDate, nowDate;
    var str;
    var strbase = "RGVjIDEyLCAyMDE2"; // big
    var aaa = new Base64();
    
    if (type == 2) {
        strbase = "QXByIDAzLCAyMDIw"; // little
    }
    var ddd = aaa.decode(strbase);
     // 须初始化为0
    year = 0;
    mon = 0;
    day = 0;
    bornDate = new Date(ddd);
    year1 = bornDate.getFullYear();
    mon1 = bornDate.getMonth()+1;
    day1 = bornDate.getDate();

    nowDate = new Date(); // 如果是当前日期，月份要+1
    mon2 = nowDate.getMonth()+1;
    year2 = nowDate.getFullYear();
    day2 = nowDate.getDate();
    if (nowDate.getTime() < bornDate.getTime())
    {
        return "Invalid date time.";
    }
    // 天数不足，向上减
    day = day2 - day1;
    if (day < 0)
    {
        mon -= 1;
        day += 30; // TODO...
    }

    mon = mon + mon2 - mon1;
    if (mon < 0)
    {
        year = -1;
        mon += 12;
    }

    year += year2 - year1;
    if (year < 1)
    {
        str = mon + '月' + day + '天';
    }
    else
    {
        str = year + '岁' + mon + '月' + day + '天';
    }

    return str; //+'了。';
}

function getNeedAge(indate)
{
    var year1, mon1, day1;
    var year2, mon2, day2;
    var year, mon, day;
    var bornDate, nowDate;
    var str;
    var strbase = "RGVjIDEyLCAyMDE2";
    var aaa = new Base64();
    var ddd = aaa.decode(strbase);

     // 须初始化为0
    year = 0;
    mon = 0;
    day = 0;
    bornDate = new Date(ddd);
    year1 = bornDate.getFullYear();
    mon1 = bornDate.getMonth()+1;
    day1 = bornDate.getDate();

    var date = indate;
    nowDate = new Date(date.replace(/-/g, "\/"));  // 如果是当前日期，月份要+1
    mon2 = nowDate.getMonth()+1;
    year2 = nowDate.getFullYear();
    day2 = nowDate.getDate();
    if (nowDate.getTime() < bornDate.getTime())
    {
        return "Invalid date time.";
    }
    // 天数不足，向上减
    day = day2 - day1;
    if (day < 0)
    {
        mon -= 1;
        day += 30; // TODO...
    }

    mon = mon + mon2 - mon1;
    if (mon < 0)
    {
        year = -1;
        mon += 12;
    }

    year += year2 - year1;
    if (year < 1)
    {
        if (mon == 0)
            str = day + '天';
        else
            str = mon + '月' + day + '天';
    }
    else
    {
        str = year + '岁' + mon + '月' + day + '天';
    }

    return str;
}
