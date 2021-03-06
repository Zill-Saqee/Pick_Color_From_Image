import React, {  useEffect } from "react";
import "./colorFromImage.scss";

const ColorFromImage = props => {

  var img, canvas, preview, x, y;

  useEffect(() => {
    // vars
    img = _(".selected-image img");
    canvas = _("#cs");
    preview = _(".preview");
    x = "";
    y = "";

    // preview function mousemove
    img.addEventListener(
      "mousemove",
      function(e) {
        // chrome
        if (e.offsetX) {
          x = e.offsetX;
          y = e.offsetY;
        }
        // firefox
        else if (e.layerX) {
          x = e.layerX;
          y = e.layerY;
        }

        CanvasFunc(canvas, img, function() {
          // get image data
          var p = canvas.getContext("2d").getImageData(x, y, 1, 1).data;
          // show preview color
          preview.style.background = rgbToHex(p[0], p[1], p[2]);
        });
      },
      false
    );

    // short querySelector
    function _(el) {
      return document.querySelector(el);
    }
    function findPos(obj) {
      var curleft = 0,
        curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return { x: curleft, y: curtop };
      }
      return undefined;
    }
  });

  var CanvasFunc = (el, image, callback) => {
    el.width = image.width; // img width
    el.height = image.height; // img height
    // draw image in canvas tag
    el.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
    return callback();
  };

  var componentToHex = c => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  var rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  let handleImageClick = e => {
    // chrome
    if (e.offsetX) {
      x = e.offsetX;
      y = e.offsetY;
    }
    // firefox
    else if (e.layerX) {
      x = e.layerX;
      y = e.layerY;
    }
    CanvasFunc(canvas, img, function() {
      // get image data
      var p = canvas.getContext("2d").getImageData(x, y, 1, 1).data;

    //   setSelectedColor({
    //     rgb: `rgb(${p[0]},${p[1]},${p[2]})`,
    //     hex: rgbToHex(p[0], p[1], p[2])
    //   });

      // add background in body
    //   preview.style.background = rgbToHex(p[0], p[1], p[2]);
    //   document.body.style.background = rgbToHex(p[0], p[1], p[2]);

    // TODO  :-  Save Color In Redux   


    });
  };

  return (
    <>
      <div className="selected-image">
        <div className="preview"></div>
        <img
          onClick={handleImageClick}
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMVFRUXGBcYFRgYGBgYFxgYGhgYFxoXFxgYHSggGBslGxgYIjEhJSorLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzAlICYvLy0tLS0tLS8tLS0tLS0tLy0vLS0tLS8tNS0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EAD8QAAIBAwIDBgQEBQMDAwUAAAECEQADIRIxBEFRBRMiYXGBMpGh8AZCsdEUI8Hh8VJygjNiwhWDkgcWQ6Ky/8QAGgEAAwEBAQEAAAAAAAAAAAAAAgMEAQAFBv/EADMRAAICAQMCAwYFAwUAAAAAAAABAhEDEiExBEETUWEiMnGRobEFQoHh8BRS0RUzYsHx/9oADAMBAAIRAxEAPwBUturltValur1t19/KZ8HdlSWqsFurVSrFt0lzCRSqVYEq4W6mLdA5hooCVMW6IFupLboHMNFAt1NbVS4i+lsS5iZjzIBMDzgGreFvK6llMgTPURnb73pMs8U6vcdHHJrVWxWLPX64q5LY5QazPbfbQuoO4uG3p1MzMIAIUELEE7E7czEGZAPZVy4f5tsvkDUJLEgkQQOknIPlOxqCfXvWlFWn89j0YdB7FydM2kV4UoTsvtMXdIKFSQc404gH649SOtNRaqrHmjOOpEeSEsbqQL3dd3VGdzXvdUWsWgPuq7uqM7qu7qu1m2BG1Xnd0b3Ved1W6zrAu7rzu6N7uvDbrdZoEbdeG3RptVE2q3WcBd3UTbo02qibdFrMoCNuoG3Rxt1A26JTMoCNuq2t0cbdQNujUzGhe1qqblmmTW6re1TI5AWhSbNdR5tV1O8QGixLVXLbq9LdWraqSWQlSBlt1atuiVs1cljoKU8g1RsEW1Vi2aPThTVy8NSZZkNWFi5bNWfw5gxAxz29/KmQtAb0t/EeeGuDUEBABYiQAWAJOfP+x2pUsrrYfDCtSTMT+I3uAqX8TBUZdBDJ4og6QepGREyPZfZ4rQrlHiS2s6jk4Ywcg7TFA8Q6vxA1ssWn8G0FAPHkHABQ4jpnnQdhdR0tcBu6n7sfkJEeIiD4tonENXi5scpT3Z9HjxpRSGwbIg6SPi2giNQEn1AE7AH1Ppe4qLbR9UF5kNJCzpBIwck77wN6zlzWf5BVFcuNS6RMwRq6HHQ8ztFOkRmRCGI0m27pB/K3iBbkQJJHQjbnmlQ2b2CcTUfh287IygLBA8KhlI1KTKjTziZMYUUVYuXbQukOGmJJ1SMfGAcSowc7/Oq3uW1s6bfxkzGqRsSNLZJMz5GD50Hc4p8juzMZG0tEkbiQCAD11dd0y6uox0RtLvdVfYV4abd9wzs/tJrdyWbWp0qZbLQANSgmd539d62HDMrqGUyD9xXzfge1JUO4Kj4RpPUkSrDyMwOgzinI7cFm2LSaVIcszGfFIxMAwJKznAHrNGDrHHaXyXmI6npFk3XJtO6rzuaH/D3aHfW18Lkx4mI8JPrzPkKb93Xoxy2rPLnhcXQB3Ned1TDuq4WaLxAfDYu7qom1TJrVQNitWUzQLjbqJtUwNiomzRLIdpYvNuom3R5tVA26NZDKATbqJtUcbVQNuiUzqADaqBtUwNqoG3RrIZQvNqq2tUwa1UDao1kB0i02q6jjZr2j8QymSS1RNrhqNt8Mo86ugVHLNfAUcFcgqcOByq0JVgrgtKcrGJJcECK4Ck/bXaLI2hTpgTMeQ58t/oaQ8T2s8tJIgTOrHT3P94oJ5NJZi6SWRam6NwqUp/EXZvfBUcxZJm7kDAkg6txkAY60J2f2gwt4cmInAMddh1z6Uu7e7Qa7YhmIQvBPhOFGrInIwSI6E8qXlyNQsZDpHGV3wJfxVw9t7+myii3bUr8IgkjZSQZAIJKwZx6Uk4rhiwnwjwMoYaoUlhMLg6/iI/2+cVLtPtFNDKHGMKUPi1AApABGIk5EGF6RVFu83djiASO5gpq8ZYaVGs+eWyNjPSa8l5Mk5a5bbnowhpikD3uzHsMt1PExLBwDvInAIlTu0A84HOnHY/FM4V3jBBA1YGSCdW7HJmc7AkxSfs/tm+e9bR3iLOto06YB2BMTAOP7UYOLOtAbhBCqzQFAAC6lMOfDCsPOSN4wOTU1UufMIvv3iBgBg7LkH4VLDSuGwZB8jo5zJI4S83eySzsY8JwB4hLGdjkegGdzSrW5uPFp2tpK+IhYEYViQCRME5BAkdaY9t39Itg28BYUrgZIZtRM6mi2NxMGRnbWoNU+a2XyM7hXHIzBWVQ5QeIZDtBIIIOIkYjJIA5U07K4VLlwWr8pdZJQuBByx8TAwDCEGMydpFAdnBi4Lp420iRnSpUgyDlW1KR56p61tuyPw4EUXLWi8AylVUwMgByXMEnaD0wQao6WFO324+D7bbC5y2pDrsXsfuE0yG9BAHkMnEzTDuqItpgSIMCRvHl51LRVOqhDw3uwYWq8NuitNRK1uoB4kkC93Xd3ROiu7ut1i/B9AXu6F4/irdpdTmBy2k+QHM0w4gqil2MKok1877c4scSyuVZVWQymIiRDEBviHqPi6CgyZ1BB4ukc5b8Gx4PiUugtbOoAwfWrjarH8DxK2rv8sMROogSQxOVAgwBgdMnNaXhu2g7hdMCPFJAOrnEnKgeU1mPqovZvfgzN0bg/Z4CDZqBtUH2hxzK0augOggwNyxHoDTOy2pQw2ImqY5L4ZPPA4pNgps1FrAoxkqs26YpiXECa3UGWjGtVW1umKYFAZHlXUR3ddR6jqYST0rgtWKlWrbqdyoYotlKpUwlXLbqwIKBzGxxHy7tviLvftOqf+4Lz5BTiIH6VG/wYCowAYzI8wzL+boDAI5T503/FLW57wapcGF6xAB9Mx7ClPZjakI7vWVPxaiIBBiRjBOoZ/wBPpU2SotxR6OKTlFSYw4JZEMHxCkwDBKwAxnOAfekf4o4aVYm4VtDSWhSQXI8Ra5vpAiQo+c4cJ2grSRbWSkjJlmzD8/FBcz6Ul7Sfv+CW2GYsWYliAAyMxOr2MjIiTuKFZYyjs79KGNST3R84IXvGgtp5SM+WFJAOBG4pnwPG/BAhSDrDFmVh4gJEHBErgch51PhOC0hmIARCNRzBJfRpU7kxz23EZmprZa9/MPeaA0q0EfmCiW5xp3B5VPOafIzUWjixbAtWCFcN42WArAATAI9DJEYONqacX2ctoJxGjQVCktMai4C/9I5iC2o4BLeZgGzwyKpUgki4MLACGBG0M6ljuem2TTpr2saCSusMCpgn4RqGsBpHw5MfCvrU08ij255ObFlrh1GstdugqXW6GMyCojWA0KAJExHLzpnwEhSGJuBmNrUqENEGNiSBMxvusZPi8Z1MG4RJgMCSAQZmDtmIzjYTRfA8NbW6FDSxJL6ZBOqP+mVOpW0kRvEbE4pSlGcva4/nfkBss4CzeXurik3AWA1aUCqpYoVOkyCCpJkDHLNbz8P9von8m6NEZWBC5knI3PM5NZXjxbsWXWyIBAEsCCASssxB3G4OQ4HllXwvb4YAOWy0KANRYEAfFGDsdulH1EpYpKWHjy7fIGL8z6ze7esBSVcMwmFyCSJEZGMiofhrtj+JUsQo2iJG/kfLnXztOGS4P5lwgMuMHWzZEeFguAd9hM4mnP4Yv3bLeAG6rMoa5pLFVMEsVG+MavpyrsXWSk1q+gzufRIrwip6h1FeqQdiD71fqQTRVppR272obEbREyTuZjSPP96c3riqJYxXy38bXDxV9La61ta4YEquoQRqWc6QVUnqJihyZNMbugVDcC7R/HV2+bthbYNrZ7jSsCVBIU/lBzmJHSaF4zjSpbQVgEDSWOqYLMSOQggjmQsTSLtLsvSoS2ykF2LrIwULLIBycZmJk1dwukWygYOrKHh1K6TlWUxOoEjcECDtiosspSjTexRBRT2RoEu6RqWBpnfM5PKMSJOB1oa9xhVUCr4JwgGxAMQWHwgEZ6N71ZwnESqOn5gCdh4SP9JAOcnYbZqjiiG5AFWOkehWYAMHy9q8+Eoxe/IyUXPcITjXDSGgjbEwZ1bGNxj1rS9i/iJpVXBKmBIUzJwuIG/9NqxrNpYq5B8IIPMgHB9ZA9MVdw3Eqe9UHUyhh5jwnxKQI3aPUD0LcGacMlp7dxWbBGSqj6Lb7assRpaVJjV+XmJ/+WPemJSa+ZLfMGG/l8tJAIE6uXKQcT+c+gI4XjbquLjXZ0sCVDnmY5mNMCM5+tenD8RS94in0K/Kz6EbdVtbrMN/9QLAYhhGVgjMriTHzApX23+NG0hOGbS5DlmZC0E4GncY36bb1W+txJXZIulk2F8c1wXGE8S0GJFtgDGJADge4Gd66sTxPaz3GLtxF8k7kPpHTCpgCP75r2lv8Tj5P5IqXSquUfa1WrAlWqtWKtUuZNDEU6Y3qnim8BZCDgn2jf2/pVnaCnQdIB6gmAay/A9qMpOpQEOoMJiDHwlswMEgyBQPKkN8PsKu3iQ0lgYGBMaQJM+vh23E+lLmLDQVGodFX8rb6mnA0kEM3UAwTlqn4cuNra4BJgkhsg7wBBGZO2xjGKjwna6IgsqsXQYLt1wck5MtM+oHSpZZVzk2HRjSqO4ttlHRbluDouIw3BVWIUagR4YfliNJ6Vnr3aioqfyY1oNQLEhlKeFgIMMRnSCCM+RGl4ngltvcdFPd3kcICyq3fMVCssQuWJwIkkjakfZbd7wyOIQRBGRqAJlTG3inmdozU882iLrj418PpRRCGpiLtjg7rMxt69FwKADsD3kBDMsP9RjHypj2Tw72OHU3gChATxavCDJghYKmDzE5Gel3GWNVp3a46rbmfys2kwRadzht8YMMd96p7Q42OFUWiLJDBtJcagFkQFBBfxlcxG+RSpS1LTJc/cGUfIr/ABHai0lxRB5sAQdJ2BG3OZOc43pP2Mr3Py6g0gyxTxEakYxvMdT16Vb2f2iAurU1w/8A5ZfAJP5UHxbAAkxgbDNWJeZ+JdlJTlJBhoIBGnGlwp5kAQdozkFKMXF/MXQRettbtDWzqS8RqL6FkiG5Hl7wRnc/sy6A6kEAKWC5JKwuoysDGOWOQ5Cu/gl7kLPeadpELq6Z/LJXnMAZzFX2LCKghVEjdmgagTE5ImQRjYHnU8s0XHYHkZ9o9q3O7uTYtXVuC2sKxbSU1PuVBbCmQeQHnKjjHHeDuH1o41EEMA7EEFCRJEiDE4iDRds27qFCEVXVtOkk6TJVTiARgxJ5RGxqZ7Ka0y3RpaShZlEINIbUdJbAjSCMcsUMusbTjPkJR2tC3h9IbQWbSoQapMalOrmfCSJkEYieVafsvjQg760WME5xOc4IQZMzHv1pBc4W25Z7b6byktzYxMbgwT0mZ2kitn2dpCjQoEqux+LCnYgSI2nbIxmo+p6jSk1f2GQjcqKbXH6ybltmZozJPijcddUH6iocJ2g0Kp1oSGK5GYMQSfWPequM4BdRu2y6FZJDZDaskqTOSfMjHzW2r4cRI+JgOe2YzgbedBHNqja/ca3p5J8T21cKnQAWDQ+psjPORvsRA6etArwxcEl4PxMQCFJAAnSRAIg5iKLUK2oQEGogjPizksIE8oahuItFCDqbErlhCqsdTC7bg/OmrLey2Z0JGY7QPdsUVhcIBEscjHwzzGenXyovtAjuLTwwAAXVIGsAlpGkTEArEyfTJovIELuCDEmG0tmTgqZmYHz5RFLuN48wqoxGQWj+gB2ycHyq+KbqjtRb2j2tfYBdcSSI2kTpjqIJ+ckRTfiCW7oLpUEhSxBgXCVUDBBJmDg/Pl5/A/w3DHjOKsF2uA3LCufCNZ8DELkxIIGDOSKu/BxtcUXN8nUqi6rqrMbbKQAVtaYEESZaIztLKTinTS2Qau6NN2jw9tjFsBliTBDnLFSVMn/tODiM5xWW8NvxgltSgOQcMSdXiHXw8v8ASKY3OMuML92E13/ECJCaRp8RQXNKkd2uTJmCZk1nOO4a8g8LjkDpBSAMiRIz6Yx50iMY6mos2cy6xxeP5jEBSdAGE8MAAz8RPXkfrW3aq3GyTpkSMAqRgkmMQTv+2KTw9wq8FXYFGCxBBkSqsNhvvHXFCdxctTcdTJxpGy5O4AyM9ZpyhBv1Et2MuPs+CQm5gYJEnqPluMUm7X7WZR3e7A5PIjlIH360T3lzWrDXnxTJjcmDInIzULl8OxYWlJ2xJmYAM8t9gORpkI1VqzKAuEWUB1rz3Zgd+eK6m9qwoAGlFjENpn3lgfpXUTyG7n3TjPxZwlq53T3QHmCArMAehIETQo/HXDaipFyOTQIPtM18Rv8AHlrj3LhIJZmBmZJO+nqZwN81db4s+FXyTlYw2+5A2j1nFFPNl7EcU0j63x/48tG2+lG1DYTgidycR6fWsv8A/edxiBaW2sDK5EkASxKkZj1iRWRt8SWYKMYOSAYxG059fL3AFpmBI0iFMwNomTtk0vxcsuZUZV7mxu/iq4PDjSGJCEawCSJw0zsfmetQudrHdZB1EkKAoEjoBgYNZXs52uNqE5Pw784kCOojPSreKLFbo1KArqoDGJgMNII5ltJHvy3XKEm6bGwb3Q47T7bY2hbfU9oHUByXSZBhsHJb72j2e0gaZCvMflCDMbGMztI3pF2qhe0NMxOkkFYxqJ+HYYPyoLs977h7IDMbazpgeFV3JnJ3Ajz8q3wdUOSvHkUEzS8fd4eNLCSTOok4YDSSuCehAzltxIqyzflu67wMpDjvGChg4XAQExITqMkHnSXsDhGugs+p1JCkbEKCSWnEZ9+taXs7jERBbsWHKTA0iSW8MOWBnnMnaKTlWjZW2Jy5L7CXhezLax42VwRqgBiZAkaQYXyywn0iveI4hrwuKo7yM95pVe7KjPj54AxMnpTD8QcC7rbt27f/AFJUKPhUs6kOxiYDE7nnNQ7H7AvorjwsGUiNYOW1S2+4K895Fb4sXHXJ7+vxAinLgW8FwPEABiStpX8ZJ0rpOQSTkqdIECdhWr4N1Y6kHeIQfFKwcaYkgaWGenrSjjroRkS+wCF7coqkhxrBYsd0BBOMnfeDTHs0qqsLdolUOGKBtx4SCgJiSRORkyeqc8nON/YyUZeRdd7ATLWCASA2gGVJUggidgRy22867sri2tXHtXg2l38BUkydEgSRldJx5rQnHdmcXIIF2FbWCLe5iABBxgZ66vKjeD7Nv8VYXvLV1it2E8OgskQXdmYQdUcpxznKGrj7ck19UdFSi7SDLzC23fEAfEmcrpMGMAyARMc4O1EcDacWpZtSsdQ/1AtmD1GYxtHtR9rsV9bgFijCSz92ADtAVpG2P8V7wnYDICoGmWnxXEKnS+pcLkYA5depqKeWLjz/AODkmIPxHfZVzGklohRrGBKHBkM4GRGFzQ3ZvFpdCgjSSJBbIldW3KYLCRG/yYdvfhrimuWjbS2dLszMGWVBckCHwfDp2Ebj1psfhi9bSWFokNcKhiCArEsFJg6jOBgQCd6dDLg8NLWr9GKldlvD8GniHIkAyZJiCBqzKxET5UCbtwMUdV0+EAnZyQCRJ229RO3RzY4K4Mm5aIKqoy5JI3x9PkTXnalpCLatdVXLal8M5AKtCk+GDgnlS1lWrz+YUG1uZDtThlYswBDIBbgoInxAtEDUNo9NuVB2OxRrXVDIpYkAktBgkaVGQI2G5JzFa7tD8OO0Ml5YzAVRHqArYb4t/wDM+wvwyiXGAuveZB3rITnTJXAWDHTPIVfj6qKjSe/wYxpvahLx/AtxloIxdwjKikKV0RyGsDEHYeQqfCdl/wAOpS33gZ9IuASqkBWVQ0HAy48yTnAh9x34ssrZ0rb0cQTpVLa94SukZUgShJgfDykdaqTt43Cga3cmFzEJb8QKyDOg74G/tFDLJliqS2DuMe9gPG8IukW9IGmNgdImepGIx6HnyrucNqAIA0jCjYSBgCMR5+dOmcsAzrA3DEE8pJ1n138wM1T2hadBqe2VSMEkgxBxJxIjrkGpo5JXQEpPstjK2eAunVOhZPiCiJ8ROSAZMaYGN+uTYeEwDlt40xJwSCdQE8v8GmyPZZQUZ9Ub6tQHTO3vM4q61bQsveuBbgw4B8LYI1LPM9Oc+dU+NJvdUCoyYhuWW1ABHUkE+IAkGBEKduvnHvS4XXLMdIXT0UEkxzIyTz99udaS7x5kAIqgARk6ZBILZk5jy2FBcTxkjkxnxAHSc5mRMn1NHDK+6Bt8CB+Fec2GbzBx9SPTaupqeOQbn57/AFFdTvGn/b9zNTDm/D/DHC3CpmQVCz6DUCYr3h/w/wAKrg96zNsNS2mjnjUhz5mtLa4C0TgW5InCrMdfSSKJTs23M6RPXSv7VZH8OySj/vfQ8l9XNOqElzsK2W1ASDBOofEfMAY5bHltUuH7BtKZVLSkYkgsfPLPNaIcKvT9P2qrSJ5fM0H+mPh5n8v3GR6yXl9f2FidiWlyluwrYki1b6g9Y3UEdIo62WUGbgEDIUDO52UZPpRB8o+/Wod8dpHyFJn+GQ/Nkk/kNh1UvL6syvGfiRLLsE4R/wDf3apqPMmVnnz86y6cHx3EXbnEWbfdm4NLEEKrKVj80KRAG3tWi/E9pwXYmdvvArMdm9qX0ZoJ0wIH7fOhjDw1Lwlv/wAnZTHI3yH9m9lcZwRGp9FskGbeh9RxHiI1AEEnHUxvWx7HuhLZa2iiT0ImZiZz1xWY7J7Ru3rLK7FWBEFoMgAbAjA2EfXOD+y7rC6xMi3AkbeLwZPMnHvUnUapprJV967nSlqZpU7Q1kACdW/UKZj1PpG9Eo9s4CqCVmSBviOfUxWa7MdP4jxE6Y2yR+bHz0mmF28p4c5bvdDAbbyvlGIgGJqLJjipJIZBeozewgPisWjgEk21OoEiMlZPL5Udw95UUhLa24ggKgAg7xy5/WlfC8ZqsgODOlSSSSZA39942yaObirZW5IJMYzmNKzJ+dIyNcP7lEsCXDD7PF3Bp1SQcD2WZ28jjzFLr/aL65Bw2oDMDwgnY8zirO0eNBNnSAB4w3XKEe+YPtS27xg/l42uXIE7SjfX+9LxRhd1/NxeTGk0rLh2uy27j3DgCcHlA5ETPxGhOE7SZmgEyGyG3jTJ8uameWR51Hg7qHh1F4ExbAbO/hWQZwJYE0y7N7GtkC+uS0kEnw6dx4f8DNPnkw407XohE9t7Dr/Fabep30gbnFZji+2jf1pYDtp+IsNIzMgDfYH5b5ArUJZRvDHkZEgg8s7e9VcRwMNKFVjkYInbMfv5VFgy4oSuS37eQq29zIpYvDiUYpqtlYPRIDBgQxiZB2Ew3IDMrvZPEC4t5HhdWu8GPik4CrpG4BnbPh6VqxZGqTpY5yImPM89/wDFEWlAOApMQdWQN/1Ofaq3+IVwlxX6DYq1XYGTvksIHYhUDG4xUJIYk4KmTpBGSBg86X8MLXDi+5tst08OFW8HuOlxHIdiqjSCQ5bSAu0QTkBrJB1eF94DeIBhtjGaVcYju5VljUw+HSEAG5A3xO3SaLH1Sd1+pS80VHbcTdxaAe4z93ME5jEDwtEEEBRudzMzmguG7ctXLjqyDuzY127hChVuBj4xqP8Ap1jV8QzG1Mu1+wRdA1WwyqfCBccADqRABOMD02qT9mKgMImVUsumQSJ2JiI1EyM5NVY8+Orbbf2ERm1uY+52vct3BY4h3Nu2VgM7Oqgy0ZmYyJ6ARX0Q9pXHtaAAC2k2yWJAIO+QCJGOfU0lvdiWbq6u6lTDsDJMaSkkQpDQRj/tU8q6xwrEeJSrggZaYAjz3ielFmzY8itbNc/yxy6iSi0CcbxMkd5aIGnJUamO2TmeRjypezroGkDDAhmMtmY1DbSQTy5Cmo4VIgmSRpPiA0yIxO3TrVNngCuqW8OwMksOsffI+xrLEQ5NsBsuxLBcxk5IBxPXO1Ul7rAC6vniTpBGszsR6+VMmsAqSQNIg4IIwQYgCSCBHnS4rqmJLfl8XhhgYAY4PUCMTEb07G09zIvYX8QviMkA8we8/wDForyrLvAFyHgtqCmQzLMqOWvBrqrTj5/YM1VggKLinSSY3M52U/Q0+7Ke6Q3ejYwp2JEcxGK+f9n3WuquhpUNDR/xb5bf/EV9A4JAo5/fltW/h+CcZvfY8vq5Qiq7jAmgDcE0S1zFKu+GoivUyeySQlZe1zJz/Wl/enWc1Zd4hdXtS27xA7w/fSvPy5OCvGivtoEzPT73rLcORJgAVpuPug7ncUitcMAWJ2kT5TtM/fnUUpbssxFvZdssxAycwB5CabG3oBM4J+hCup91ZfrRPYnAA6XSA6keKcENGWE43+p5AU7v8Kt4KyKFO5YjAYeA243kBQP+J3moc2VavQOULMvwp8exxPvkAD3JA96IHEiQJxBHr/aiuG4HWq6dQLxcjnpJZUHlglv/AGx0qPCdiuyi+QQkSoAlnLE6FCyMRB89USN6GWju/QCpLggeK8I9KuTiZBzy/ahOM7OeTnIBY6iBA6scYnGPagzdKnDAjEEAgH0nPzoHhTWxs5zW7HjcQcZ2P717w9vVJnYz9IpFd4ozE8/3pz2ZxIW05O8UWDp03v5MU81ntvYr5fr/AIozhLLBYBZdvhYgZ6jal3D3Rq/4z8pJ9cVqOy+JVkEwIAGcY2nzz+tMwdLGcqm6sKUnVoQ/wl+0GZLxOWaGCmZAxyj4f/2NEJ2pfB0/y3UYBEoTnBKjbGY9vOmPFcMGGDWMupcRmjcHB/tRdV0Dju0n+n+BayJjy92+6Ak2YjbnIgdNjJgehqfDfiizp1XVKZVQCZYkqDyBI6Ug/jb0r8m9/wC1e8Rx2wdAdxmPb9alfSxdJx+TKFkH3Gdss2lrFwaTIjGecTyOP8VH/wBacamdibcBgcKQCTvPQx86znHEDSygjrBx4ZI286hZR2cZII8W8yeYM7iMHyJpsenw6N1/kp1WlZsOF7RS8CLLqciQYO//AHDBqq7auSQGAjAiCBzO2x2xWPtcGEN2LpVXLEhcAFiCQAOXSvLFq4hlL7DMiQNoj+lL/pYJvTL5oS3E0VzimPhJg9JjVuJjMTXDwkwY5+/rv/ms8vHX1uO2udRwJIAwQd5Gd8UH2j2hxRfUG8IGQILc9iR6U6PS26TQCSs1HE3/AAaWKh5mR+bYQZ3nEHlS2/xbElYmI3jJ3jAxtv51luI7U4osQ2ooYmYkDy9qWXu2eIggs0TzAJ+ZEz71bi6F+aDWOzc2eLJG4BU79ZM6SQYnMQZpfeRRCkj86ghpkgLohp2J3J5EVkv4hiDLtqJMmYECD7z08vOrOybssFaepO8AFcx1EHPnVcel027GLHRsLLWrihy7gkZ0kRjE554z5zXVmF4mzEtceTkwBEnMV1c8HqwqN12Pw9vh1K2wSCZMmTtFM24ssVIdhB2WIOCIMjIpVZOOe33kSKI0nYD59PSvLfUZlsps8OtTt7sbrxwjJPqd6HW2GMhhmhETeRJzsfuavtgj8vpMe3MnafWsfXdR/ffxo1Yo9kR4vs9naQ+kehqHCdjFCWdwenrR1hyTnMbiZ+RGD71cb4G2Pv6VJPqczfI9bIGudnW9cgPMYxgYwJ9IpCgC3XLppnGkT8OxDHnMjOdpxg1rUvSM/v8AWpC0jZZFk4mM78/lQY+qlH39xiydmAcDdCJqgsv5k0kNoAIOkco3lZOB5Va/HqoDagWLMWxpyAuCQMajJx08q8XsCzqLfzBIiNZKiWLmAerEzP6Uw/gbOgIwkGQDzypHPaATH966efDd7v8AQdLKmtgW1cA8RgFY8UEiNJIXqY1nbYEeVXXOJDgGRhbbQTDyFFwE7xCzn/ujc5r4/s1gn8s6gEdQNsETM76jESevmaS8Jda2UmVYBMhcAajEzhTpbJO+ekUcIQyLVF7mqXshnaALj4FKgjDam1GINzcknbxEHkJjJzfH8NpfQpAO+gk8+mr7/StAtxmLEPojGk4D+pYSTEyZ856ecdwK3E1rnSNhcBUkAwSzAhWnEgzEGaohJQ2kdP2+TOpZJYDmSMeZ5UQl493zhtQx5bj5UTaVFuCRoOoEhwD0MgwQfTHlNWcHAm0Sq62PdtAyfhcwDByts46rBpydbonjDejzhL2l1MZQTBwCuABIOcnPl6GnnAsE0rbZiAMAgZB54MeEkqZAgo0UhTh3t62csbYKhQAWIyG1MIgAf6T/AKhOJpr2TfYRaOkXlVnQONLadJJHwkPBYEkTBB86Xkv3ov8An7DorYcLdbyHqNqWcRZliTBJ+zFT7N4wuEbRKudR32LEadEYaQVIJ5Hyq27cmTpGCVnzmI++tevj6uGRLHPlc/HyJMmGUG5IFTg5IHyx/XpSft3hQFkRv58qeu0CNOYzA99P6Ut7Tt+BgMGDT3gjlg3GvTz+IuOVxlTM23GwCM9fnVXA9ow2ppxqGDG4oPi7lxT4xjzUfrExQqXc8t+W1ecsCo9JSew2Lzbdsco686F4W87MFwRpbryzVdm/KFeZJxVPZxK3Qp5agcZ6fe9EsezC020e8T2qwMcsUdw9wkT1EmguOQayseYmMjr6zXN2kq243MRjcH9qKWNNLSgljW9llziOXmaWXnmds1S/GAxnrVNm8sgE4mTBjkf7U+GHSYsbKBaw39qna4siAFQHENGRy6x9OdU3TkxVYqqihBAYc2E+hrqGrq00+o2SDjVz25Tyjz2onhh1IJjIwI8vLrQNi7GIxjAx7D60SpEdQfKfXfb+wr52aPAQaANgQcGRjE+8mrluDcx68hE/ftQC3IOMHz/z+9Wq/nvtIj9aTKASYf3igZPXy5beo6eVQW4s4gDnuY9POqEERMbkZ5+Xzqy2dojPPc5x69KW40Gt+QpHK/rk4q0NkyN9t/PehCwE5+/PGd6sW+vnP9hueX9xSnB+RrSXcJR+c/WB71bbbaPT68qFF6Zg/fv6V07EmOnp6+1LcDUhmnER0Axty+5q0cRIgjl970qFzbMdMD+kmq1vzs3oY5Ut4bN4HbIGgmJG3X72qKcLbmYAkRjG2Rn2pbb4o+ZHyxiPWvf4oTBnnH+fes8Oa4YxSXNhfEdnIwA0IYyAfFnMN4jk5/zNLeL4C6viRQbkk943xoCcKn+npqHi6ECjrdwY58sn7+zUlvtMzA6HHuc0cMuSPe/ibqfIg7S4biociGfxQA5Q7QI0xiOe/mIzn+y+0Lym3w7OA5d5BALLzkSJY7jxyTqbOK+hi42+rrt/WqrvCWmZbhQa1wrdJEEDyM1Zi/ENK0ziv0HQyPhoSdk8aWv3UVpTXpQbQriCYHwkHVH+8e/vDLoIQqSFB3M8lBInlpBnf60Ra/D9lWZrRKhjJWZGRpJXptVd3se5JgqyFWlCMFiZDNGcRyg+fOjefDKWzrbvsY2meX+JS4FZCYYDxSW/1JsNzqQgCcjJOYNV5NtLKZ+EDGOmYiPSj7XCC2BbUabcEThjLEtmRMbjn8fKlN0lVM27aqB4IGvJIEnUNoBOIGBirOk6xxdQe3r5P+dhObGpIW8bwgJEgddgfcHb3FZ7jbelyIMTvWkv8QG/KAwBwPhPMkCfCYzjFKeNAadvv9K9ZpZI2lT7icc3CVN2hQmBTROGlQZjGDufWcUut2SCBA36k0yVyBQ4cSlL2hufI4paSJsmbZ5pK88iSTS9+yhG+f7etMGuVWbtPh08V3BfUzZm+M7PZcgEigorU3mBwaBvWFgCBv0onForx9Ta9pCOuo27wctC8/OKHFkmQMnfHSJP0rLKVJMrrq9Za6uCPoNonEnJ/feT/acUULu0zMwuOYn3+zSrhDsYZepgD39YzRBBxnHLE+WNvL5V40oKzw3FJjFuJnMiR/mYPP16+VWd/IydukR5fp9KXLcHwnOfQzHn6USUVvPryz5UpwSMoJW8xHwxI9cQcHpz+zVlq4o+JoJJGPOOmeX3igwCTzUHyJwIG/7+VTXUNxttn0H37UDickw25dHvET5b89qnYIUSMmSee3oR6fM0MkYMRy2ztneKmt5MQrnE4x16bY+tLcdqoNKw0XlO4k7eWQTOfuKl3oxM+npvJGaGV4Ph+/njYfWopcn4QeXy9BStBrsYC98vvBNeSTJ/rgfOgdRBiJPv6Y/t1r3+KiIJ+hkeXXlWeF5HXfIUXEZiZBPlPp1Mf2qZujEKTP8AbPzoC1fM9fuRsedWrezqBjlGZ3nlg4rnjNW4eLxBED5/KotfYbkxjpHP+31qhLwYQQ2DyHtief71PvBtOP13peiuwaXqW/xE7Y2B/wAcjjr0q1ONBxJ5Y/Qz1xS27dWMLA9J9x8j8q6zbBzk7849dj+1a8Ua3OVjJr68vIdfeal3vOYyd+fz6b/KgEUwsSMe/vmvTcbYkTy+v370HhoZYUeIB3b38xVd2/G5EY6Tj1ihBciJAI2IMSI/vXt3iFx4cHG/L0P1o1iNTJ3+HtN+VeuN8dI5UDc7JsnYlecfvNW/xI2yDGdvODv5VA8QsYIInmY/X3+VUY5ZYe7Jo5xi+QQ/hwZi59+ZqPA9lOpCuFK7nM/IYzimZcQDEHfEZnGc9M1S/EAYB3G8b5wMc6b/AFGeUabv+eh0YRi7Qi7R7JugyqEzMxtPl5RH1pNxnB3lAOhgc4ifnW0TiYgk5OTzG8+4zVF/iGHLEn3ifOAPnttVWLrMsVppHOK1WjF3EugAtbZZ5evShrblzAOf18hW2biXJwwOwzzn1zAkfSqLjIhMWwJiPCMCeXy9qoXVyfK+pqaXYyS2GAY8wpkGQc42O+CapsWzbNt23LiR0X8wPqGHzNbQKHJ1IuoehxHPG1AcZYsspBjcY1QJyAY6wT9KKPU3s0MjlXkIbAVBpKlipYEgAgwxGK6mtvh0GFZQJMArqO5O85rqZ4ofiI8tXxBknfG/0wKIM6QDd9BttywfL60FYsxjVk7xA6RAjJ5bch0oheE1eKdOR5wZnO0f4qeSSZI0r2YXBwVI38WNuZ3k9B556CrbzwAV8RzgTOPM/fnS8WDP/VAOAQPvFGoDAg526z6/OlSQqWwXYuuFGwjqQSQSYieYq0vJ8JjO/XP7f0oLv8EuwkmNzAOMx1q5eI6EHmZHkfSfvypTh3BaYdBP5vPbMc4znn5fKrbVvbxcwPuemKVa9tJMz7b7CaJs3AZIbPTcDr+ox/mlyg6NQw0rmeURv57dOvTeutEbTMeXsMn0OKCRjny36CAD7gwd6jcutOION/Qgzjlj9KDQ2baGLNJiQCB0nn5VQIkQ07QPfrO+PrVQY7SPPmfP3motcJ6RnPTO08orFBoG7C7fDwfDKnO+xkY29T150T3eNwD0wYmOnL9qUltMYjntiQRv8x86mLwPIj0jflXShJm2FuvNQI2JE9Z+/WuRsySD7gHaBj1H0FD9/giMb+kHp5dMcqncMqIM8+gjI26bj5dKzS+4WxcAVESTvOZIzn6TVq3B1OM4z1xy5g0H/EKInfJ5cjJgHJGxjapvAldj6/exjfGKxw8w4yotuEQCOvMmDuNh6RUXcZGk4MZz6aemKrS4AfEeU/qOdQLKSSNzMiIHvy2/pWqATl3LW0MOvuScfWuBxEzBxJk+WcbRvS65aCzJbfeZ329Ace9eZC6gSZHQ+n6CmeH5M5zT7BZudTgEDI3b+pA60MyuDPXECdgNj/3YjFV2GJiQAOfMzg56HP3FVrbJMHY5Azt0Jz5fOmqFGWepfcDM6ZyScY9AZE8vOrL3EEaWxDRJgDETM4kcvalzhlJI8YweU7RqjpJE+tT78Qq/mEem+ff670541yH6hN3ipyMeIx0O/XbcEf7jivLl8SZwACS3STAB2n67etCcSumQMBtgFmDnrzHiHt51z8NKqbbA7cwMfePeiUImqiy+Q7AyZ5mduQwcFhnNQLtzJKnaeS9cDkYzQHEswMKcnE7ZBIwNwY/rVVziZbKExhtzj8yzIJP7U1Yw1AJ/9QmQDEzzO/8AvHIkxGNhVNy/JEHcLk4bO8RscnruOlCrcJZSQAo8XkMbEjbHlVVy+YOwMwRtJmcYyB/XFNWNLgYoF7hJ3A6gqwIPMEDnNdS08SOQP/yH7V5TdLD0m34ZQQ0jkP0pfa3A5advdq6urzYfmPOj3A7J3PPQTPnoGfqfnTFj4fYD2xiurqdPsMyAnGfl9AffVv61fw+7DlpXHuD+tdXVz905+4W2T4z71aFGsY/0/pXV1Kf/AELCeCY5zy/rXWt//cI9o2+teV1K7sWu5OyN/WPaBj0qT4GMeldXUL9458hbKI2Gzfo37UJwrHUwkxJEeVe11BHhhrgt4YyLgPItHlgn9auPL/a39K6urH7wILfEMI6f+QqZ+H/iP/4n9c11dR+QX5jr/wDVf0B/WpcPgCOh/pXV1Z+U0ja5DljHKheOOf8Akv6j9q6uooe8auS22o1kciZI5E6d/pQ3DZ36ke2psV1dR9n+gXZgKH+YfQ/0qy4JKz95rq6qH7wb95FPDZBnP/U38tUfoPkKvj+Wf95/Surq2XJrKUErJydajPQJIHzoS85EwSPi2/5V1dRxGdxcqjSccv8AyqfGqNBwMII8sLXV1UdxvcH4f4RXtdXUL5MfJ//Z"
        />
      </div>
      <canvas id="cs"></canvas>
    </>
  );
};
export default ColorFromImage;
