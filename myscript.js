function generatePDF() {

    const doc = new jsPDF();

    doc.setFontSize(40);
    var imagData = getImageLogo();
    addLogo(doc,imagData);
    
    doc.setFont("times");
    var formEl = document.forms.travelForm;
    var formData = new FormData(formEl);
    var line = 20;
    var start = 12;
    doc.page=1;
    doc.setFontSize(40);
    doc.setFontStyle('bold');
    doc.text(30, line, 'Vinayak Associates');
    
    doc.setFontSize(8);
    line = line + 8;
    doc.setFontStyle('italic');
    var tempLine = line;
    doc.text(175,tempLine-9,'Vinayak Associates,');
    doc.text(175,tempLine-6,'Kalyan, Maharashtra');
    doc.text(175, tempLine-3, '+91-251-2251976');
    doc.text(175, tempLine, '+91-9321092197');
    doc.setFontStyle('normal');
    line=line+10;
    doc.line(265, 30, 0, 30);
    line=line+10;
    doc.setFontSize(12);
    var pnr = addPnr(doc,formData,start,line);
    line=line+15;
    var name = addBookingDetails(doc,formData,start,line);
    line = line+80;
    //addFareDetails(doc,formData,start,line);
    addFareDetail(doc,formData,start,line);
    //addWaterMark(doc,imagData);
    doc.footer=footer(doc,start);
    doc.save(name+"-"+pnr+"-booking_vinayak_associates"+".pdf");

}

function addLogo(doc,img1){
    doc.addImage(img1, "JPEG", 0, 0, 30, 30, "alias1", 'SLOW');

};

function getImageLogo(){
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYGBgYHBgcICAcKCwoLCg8ODAwODxYQERAREBYiFRkVFRkVIh4kHhweJB42KiYmKjY+NDI0PkxERExfWl98fKcBBgYGBgcGBwgIBwoLCgsKDw4MDA4PFhAREBEQFiIVGRUVGRUiHiQeHB4kHjYqJiYqNj40MjQ+TERETF9aX3x8p//CABEIAowCbAMBIgACEQEDEQH/xAAxAAEAAwEBAQAAAAAAAAAAAAAAAgMEBQYBAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/2gAMAwEAAhADEAAAAvVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOTrnTWIzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8jXpy7+56vR430+fm6xTlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA85k6XL29fRj6kqr+v47Qw9Sz6M+AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcvg+p8nr6nV0Z9FKX4d+hh5Pqdjh36PQWeL61ce8rspxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfPG+z8zfts1c/oNdGjPopyXZ9Gdnj5XZov28TrU4L9Pr7PFdqnF23z7TjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcrqxm/kexw+xp6ezRn0ZcF2fRnZ58+jPPVnx7Md+uCWy2mH0XK57H2jg97LzQjMAAAAAAAAAAAAAAAAAAAAAUlzm9JYFQAAAAAOBk9N5DX0/R6Of0M+S7Pozxlnz6M89WfHsx36/mzHsTosr0V5OLd2uJfX0/wB8z6bPhCMgAAAAAAAAAAAAAAAAAAAHH7HOnXzHX5Ut/Y9n98j6LHytgrzgAAAAOX1E28b6bm8/T0vWZ5Ry8/Pn0Z56c+PZjv1/NmPYnRoz6Kcd91OiObzG7o+Y17/ZsW3LzQQAAAAAAAAAAAAAAAAAAAz6PifE7sevb3PmXpWRlV3PPY2ftXmexTi3CuAAAADh9xOnje3f57T0O/n5u2tYY9mOdvmzHsTo0Z9FOO/Rn0RzV8fsY524/rPG+hvt0Rn54AAAAAAAAAAAAAAAAAAAHlPm7m7ezttqtzxtlGxlj5/obZt5nqbOfa3W1+ORT2Lz3RrzdB8+1xAAfPo4nH9nG/X5B2eNfvls5u2J26M+jPhv0Z9Ec1ePZjnTmR08nT0fbKbsvHBAAAAAAAAAAAAAAAAAAAGDzXs/Ga+l0baL6WtsrsjC22q2MbbK7GUMW2qb8bF6Gu/Z53dsyTtv6HlqWftnkOlXn7rJrpygh8+jlcX16/V47rW8K3Z6fRwO9nwwx7MZk5fU5uno9rr+Z9NTzgrzgAAAAAAAAAAAAAAAAAAPOejx228/u5HXt6VtldlOS22q2MbbK7GUKralqqrap2rqtqa1U3U23y12x16YX3fa57ut5WiOf2rzvbz4rxGKuweYq9ZwdPQ6NHC7MRRzelzZ6fnsvEeyc9oz88AAAAAAAAAAAAAAAAAAADys+15jX1e3ZTdTC22q2uFtldjKFVtS1VVtU7V1W1Naqbqbb5oyjp06rqbs+e2UbIxxYfQfbXx93zeSa+yc7o5eeCvC5fsfN6ehPn/fluuj1flPSMuoMfJAAAAAAAAAAAAAAAAAAAAed9FGdfK9fi7NPR6dtVuXBbZXYyhVbUtVVbVO1dVtTWqm6m2+aMo6dOq6m7PntsrsjC2yuyMrc2m1n5Tq9XzenX6x5z0efEjJGXkKfT+W39r53uD2kd4YeMAAAAAAAAAAAAAfPoAAAAAABn8p7PNfq5XT8x0Z6O3ZVbn58Kralqqrap2rqtqa1U3U23zRlHTp1XU3Z89tldkYW2V2RlbbVbGNldnxTy+nq+d19L2DidvPznmfTZZ08j1+T1NfU9GMPEAAAAAAAAAAAAA8n6Dzubb1vbvPd7LzpiMgAAAAAKfM+s+W38r6Hn8W/X6+ri9OnNKq2qJrqtqa1U3U23zRlHTp1XU3Z89tldkYW2V2RlbbVbGNnz78Uz5NdE7+e9PycenZ698+5eV5e3ufL9ugU4gAAAAAAAAAAAAPNYOzxtvZ+tP1fd2fI1xze0cHsZ8NwjIAAAABXYODyvZ/L9nk9m3mW6NsOPYvvpq+xaqMo321XU3Z89tldkYW2V2RlbbVbGNnz78Uz0X0TvRyetlt2au14z2LlkKcgAAAAAAAAAAAAAGHy/tPF6+lssqtjawsrnhzdqVrc/q4sc19VPxW2MfUOR0actwjMAAAACOHoJtwMXrFunxH32eO3R53Rswzrst4dsO5Zyd1ebbbVbTls+ffimei+id6KL6J6Od2eZHTo9cMfGAAAAAAAAAAAAAAeW9Tx7dPJ0Y9l/RssrsphOcJxnOyuxmy7Zo4eL1sr6+V3dTBNtG3zuQ9o8dsrl6VyNtefU+fYzAAAAAji3luBzvYL9Pjen0uTbft2eP6MZ9eicKZUUX0T0ZsW3Hr2+r18HvY+OEYgAAAAAAAAAAAAKrR4nf9o29rXZXZnhOcJxnOyuxnOcJxnZOE2c4TgrCuytplx9OFt+Ln70LdPC17c0307OHSp6+zxGiMfXvO768/TVW1wAAAAq4noE6+L6XY85p39OjFsrOfHsx6dOj13iPZU4bRn54AAAAAAAAAAAAAGPy3tfL6d91mLbG05wnXGdldjOc4TjOycJs5wnBWFdlbSEJwnSuE4NIQnCdK67K51qz6c996pL7XzabvlctfS89RGHtHjenXm77JrpyggB8+jzeD2fntfRy5Pvy/fH03me3Xn7ox8cAAAAAAAAAAAAABm0k+K6lvK29frThPLmnZXYznOE4zsnCbOcJwVhXZW0hCcJ0rhODSEJwnSuuyudK8+jPfeF9F83usrsz57JwnGUc26cuHd2M9r6Op5Sln7Jxuxnw/RFAPM8323kdvVz9HnaLdPsBz+CAAAAAAAAAAAAAAA8t6mFtvL9PkaL+j0rK7M+Oc4TjOycJs5wnBWFdlbSEJwnSuE4NIQnCdK67K50rz6M994X0Xze6yuzPnsnCcZTnCcZznCbOyi+avn6PVZL9Hzp+Q0I9Oqtz4GHcW8RLdzuj3Pb/abufwgQAAAAAAAAAAAAAABV5X18LdHm+rxvl+3vTovz4bJwnGc4TgrCuytpCE4TpXCcGkIThOlddlc6V59Ge+8L6L5vdZXZnz2ThOMpzhOM5zhNnZOE4znOE1PvC79U38n6TNwtO72jk9bPzsvkvb8i3Vs11W05AVAAAAAAAAAAAAAAAA+cHvp08Z2N/ntO/0tnle1Xn6cJRpywrsraQhOE6VwnBpCE4TpXXZXOlefRnvvC+i+b3WV2Z89k4TjKc4TjOc4TZ2ThOM5zhNSdVtSK8eyqdvN9ifE17vZuP2MvMCKAAAAAAAAAAAAAAAAAAAczieuW6fIdTbyL9PZ++V0xHehg01ylCcImEJwnSuuyudK8+jPfeF9F83usrsz57JwnGU5wnGc5wmzsnCcZznCak6rakV1W1Nas2mq2/E9Jy8GnT7NRfj5IIAAAAAAAAAAAAAAAAAAAAjzeom/m8Hs1unxl/osNt8M45Gm6vnTnTVnRm/y/PoTdZXZnz2ThOMpzhOM5zhNnZOE4znOE1J1W1Irqtqa1VW1TtVh3VW6KfU+K9DOfUGfnAAAAAAAAAAAAAAAAAAAAAAAAV5dybcbJ6RO3kc/tvlt/F2enyzryL7Mi++3gyO/Pi664dOebTXmnOE4znVbUiuq2prVVbVO1VVtU7Zqr8mnV7OXH7GXihFAAAAAAAAAAAAAAAAAAAAAAAAAAAAPmbUTyMPpVt/GS9jjt0cnpYuZNvXQ8p0q49Sr78rnVVbU1qqtqnajLqy6dU/Y+H9RHJ0Bl5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGLkekW28Vv9BxL9un5w90W01W1VijLqy6dNfS5s7W9qjLn8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADP571K2/jNu7haelry3UtaxfX0/R896HDwwrgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAx7CfGQ9b5bf2KRbq1eu8R7TLy5jPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZdRPi6/T+Z39r56vynooy6wx8kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB5/0EZ18T2ebr29X0ww8UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADm5u2tsFcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//EAAL/2gAMAwEAAgADAAAAIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFT7igAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMPFbIwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI/VlSQSwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEfVlfvQLQQAAAAAAAAAAAAAAAAAAAAAASgAAAAAAEHFfvQ+H4wAAAAAAAAAAAAAAAAAAAAB/QwAAAAAEclvvQ6/wywAAAAAAAAAAAAAAAAAAAF7qTwQAAAAAOvvQ6/OhwAAAAAAAAAAAAAAAAAAAABF1GtIzQAAEA2iq/PJiAAAAAAAAAAAAAAAAAAAADFl/1HaaiSCwEANsvFKwAAAAAAAAAAAAAAAAAAAFWl/1PPP8A9lMEIBFb9ecAAAAAAAAAAAAAAAAAAAAAtz9Tzz/yoMVJAoCf3gAAAAAAAAAAAAAAAAAAAABbT9Tzz/yoNVTkMJFjkAAAAAAAAAAAAAAgAAAAAADB5zzz/wAqDVUr5bJEmAAAAAAAAAAAAAA/KAAAAAAAUP1+/wDKg1VK6PVyIgAAAAAAAAAAAAAO55AgAAAAAAYikfog1VK6PKrQAAAAAAAAAAAAAAHXeq97DAAAAAAAQKsGHI6PPUAAAAAAAAAAAAAAAB9a/qjlDMBxyAAAAAMg7INfUCgAAAAAAAAAAAAAEfa/qvlFF+7tlyyQQAAAIg9gBgAAAAAAAAAAAAAABQPqvlFFAPgPNNdzwywAAIQOgAAAAAAAAAAAAAAErNqvlFFAPgPVVggzH1DQAGfwAAAAAAAAAAAAAAAAfKvlFFAPgPVVggf1UM5gQj6gAAAAAAAAAAAAAAAI2/VFFAPgPVVggf1Q/BhgIigAAAAAAAAAAAAAAAAMz9HVAPgPVVggf1Q/FEcSAAAAAAAAAAAAAAAAAAAAAlvr/wAD1VYIH9UPxQMAggAAAAAAAAAAAAAAAAAAAABANRtxFoMH9UPxQMOuoAAAAAAAAAAAAAAAAAAAAAAAACFOAI5hsHxQMP8AKpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjDm0uAD/+pAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhqq286JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgg2+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADI+LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAW8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8QAAv/aAAwDAQACAAMAAAAQ888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888r18888888888888888888888888888888888888Fmf188888888888888888888888888888888888uCqza/8APPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKiKlqDst/PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPBalvKruMvPPPPPPPPPPPPPPPPPPPPPO+/PPPPPPLq1vKvkcc/PPPPPPPPPPPPPPPPPPPPPpd/PPPPPKfHfKvg+effPPPPPPPPPPPPPPPPPPPPIkWOtPPPPLhkKvg61kvPPPPPPPPPPPPPPPPPPPPDqfH6r9d/PL+dtw61GlvPPPPPPPPPPPPPPPPPPPNK/g/5OG7/tPPeNp1BXfPPPPPPPPPPPPPPPPPPPLK/g/1vl/JYZsvLy/FvvPPPPPPPPPPPPPPPPPPPPI9A/1vl/1PrkDv/B97vPPPPPPPPPPPPPPPPPPPPK3g/wBb5f8AU+9XC5T+Ce8888888888888418888888Yl/W+X/U+9XAq0f++8888888888888vpz8888888/Nb9X/U+9XAovL9i88888888888888egX/8APPPPPPzOU+l/vVwKPLlvPPPPPPPPPPPPPPN179gFMvPPPPPLLqJW1SaPP8tPPPPPPPPPPPPPPKlvA6djA/fMN/PPPPD7Pzf/AOhbzzzzzzzzzzzzzy/rwOlaukQBg4jnL/zzzw/vvhzzzzzzzzzzzzzzzz58Olaulemv0KaLCVnzzz13G/zzzzzzzzzzzzzzy1kOlaulemv0NQD9WNwDfzz+zzzzzzzzzzzzzzzzxmKlaulemv0NQD9cL8d/z+5z3zzzzzzzzzzzzzzzxhh2ulemv0NQD9cL9Vda/UbbzzzzzzzzzzzzzzzzzwGmpemv0NQD9cL9VdZJ33zzzzzzzzzzzzzzzzzzzz8h02L0NQD9cL9VdYJU37zzzzzzzzzzzzzzzzzzzzzz/ZqkAX5cL9VdYJYQrzzzzzzzzzzzzzzzzzzzzzzzzww9ZA4/RldYJYMpfzzzzzzzzzzzzzzzzzzzzzzzzzzzzy7xdIUtYOirzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyz2TkKqvbzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzw/6L93zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz3D/wB888888888888888888888888888888888888sbq8888888888888888888888888888888888888sm88888888888888888888888888888888888888t888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888//8QAMREAAgIBAwMDAwMEAgMBAAAAAQIAAwQRITEQEjJAQVETIFAwYYEFIjNCFHEjYGJw/9oACAECAQE/AP8A8Hai1U7yu34dCppTu4ImTimsll3X8Mh7sQSrJ7f7X3WXYiuO+o/xGVlOhGh/CYh7sd1jcxLnqbVTBfReNLBoZbgsN6zqIVIOhH4LAfR2X5EuXtsYRoJVfYmmh2gNOQNGXQy7Bdd03EII2P4Cl+yxWmWvi44MaCCY/kJZc1b7cQrRkj4aW0vUdCP59OFLEADUx63Q6MNP0MZxdSa25EsUqxBggmP5CZHkZqQdQZVcl6/Ts5l9DVNp7ex9NjHS9P8AuWrW/wDa8vxHr3G6/fXYa3DCWVpk1h08oVKnQiCY/kJkeRhmpB1EqZcmko3kI6FGKn0qHR1P7y/dVMTJZNm3EajHvGqnQyzEtT21H3U3PU2qma0ZQ+GlmPZX7aiY/kJkeRhhlDlHBEzaw6Lav8+mB78VT8RoCQdjEzLE53E+pi3eQ0MbBRt63j4tyf66wgjkdQSDqJVmuuzjuErfHsIKnQzIrfUkDUQwxZj/APkpZDGHaxHx6XCburesxxoSOh6K7rwxleZYOd4L6LNnSHEx7PBtI+DavjoYyOvk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eETHf0c3D7FSEdH8IFwJCAb90/MEGhGMkGIMoDBTPyDghPgpRRD+4cyYIF3IOrlamRkvsdfm6vEH8IwxzUMpEasxQvwRVu4U5HVDKAwU4DPdgqcBjsjOOCIc3EMArx5h4XmrfyvjIMrHanXyThl/oRfkgj/1QppNK4BgpwWZpXlR+LnhAiAn3rxDwnjzYTtBdj8r57hBfHKY+VChaoExAaSBOCIHg80yKLkDHZCGSI5+RRCCQleBBuXdP2FQdZEKga6ITYyQzEGnBmMRewgQMwg5J6YTiX4kBpr0KCgMsmmESM7IqMBuvsX7YRP5tZNA0j6IbIJQkEODlhBkwFDdQPsaq2lQRogNNTdF4F7E+C6ZRvIzN7HIEMVCnVpKIPBBmghAxhkNKD9vZLlkSQmZCZRx6OD1Ql7J/GoQC40N8dJC6BcQPsptmVDEwmM5yDeyxktPXREEEgzwdt/P2Z/r43w6BB9mAtcAxVCCa4W+H2a5ElahM7jcf/C//8QALRABAAEDAwMDBAMBAQADAAAAAQARMUEQIWFRcYEgkaEwUGDBQLHw8dGAkOH/2gAIAQEAAT8Q404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404043/wA+W1KWysBlNpkH8MYwetUpxU4B0ZsVYCX/AA2wy4Ou3WPtdRLDok3GBblz8M66gdIY0fggk7tk2SVsWNmZooR/CRryT9qOjbUJsXJU9deiiLHqXuIUDSbu3ePwhjSqyU10aMIkG1FFRgA2a09mUeVNronSabJ7kozWQv3H4NQQyTxOJDowmMxlLGwtzsxzONoytTfITa62zeYFh+G3c/BKDNkHzCgokh9UEwmMxlqZxqkxYOzE+X2wh3KwVTpoWTzHb3zbufgbkFB+RKuu/wAToxmMtTPVDQlw5IiNbleH21kpPD7H5IBiKiCP4CtzK90qc7GjjMZamerlpPf6yRcfZuStKF3t+8Rwhr5u6X+/j1UVeZs+rPaEa7u7zGYy1M9XLWbCGtLpLPchwqajZ5GMLNmYk2aFRGo/f/7A34ZWMj4xjMZamerlpLZaTCJTv7nJE5qO39EK4LzA/nEMj9tpRh5k6BFkC0SkRPrmxVJXow53ZX+kjyS2TGWpnq5aS2WkwmMAOaibiR6S3zCBX3CC4AImR+2L1WgoiNEi9jF3uwQT1EqP17bFadW+g06pCOC9noy1M9XLSWy0mExmMTNeEsjEdCovQ5TbOZ5PtdLUIgKjCk35SGGuPWYdNmWj46wR+qglGJ+XueOECbsOfkhVUuZXRmerlpLZaTCYzGWwWyDZ6OEjrNRDiyTpefz1+11VLyVXzoLWPgYXBDUP0ylRHNoFq6/ZPc+q6ARhOWl/c0ji0e3AR4jPYe7Xy0lstJhMZjLTQHmnzC53IfDmI1UQT7UoMh7kVook9mVBwSyKCFhI7X/ZwwzXKqs9xJWsF2++NmvgNEE+nSUc+nt2Zfxdr4mHKed2+ZWBdW0JlpLZaTCYzGWmgAQqOzKEG98LFrL7Nh+1NmUkGyB5nbTSWaMYmRMCsKW73Fbaf/1CPCCzfhYMd4n6YG6f9zA9j6QbqokIxSXnj8Mpcl2Wz2SGifO94oUjSzLZaTCYzGWmoMgbnwyumgQGoP2oSlxJ8ylmjGXaQNwZXkE5M4hpVxpppgfJCYgFq/gakoQL15BC+if2tF5yyhPovV9gEj7l+SyH4G78kqwoOjKY+LGMxmMtNQaNkSN+pUjyMojuFftVdlaYlSNlo+ZZoxl2nGYy5GXCIAH/AN4hakcVfklRW7RjwDvWcpAXig+8NhjMCjCLgD2MEsnrHglFAjPlsSiTiJogOp/VOfL2GYS01FkVkQrjet2fageVHXZgVUVIXVtDGXacZjLmpnoFpzKRFU+9HzK8hezN+DyRQqxm+KDiv6p+oSIq37KWRH1DzUURK1iomSCt5VVh5ROm6GZADGqBqOosg7Xmbsd2eT7W4W0irCNoYTGXacZjLmpn6NlAIjAqhHiE7iD1YOuIsKL/AMdiaw8/1E84K3O5j1MWjrceowtfKd2FwVG8/MDDN5Ho6LItd4hL/wCppFVuPtW/wNbmLSNgQHFRKkxl2nGYy5qZ+jZTPXtJdfCYEqdK0FrLEUowV0sKEom627w+lKBEojHfXp45mulVslhKwm4ZHoyyLXeOZdCQxd1lfH2okHMU6Tv7iVh/7kYy7TjMZc1M/Rspa69sX6KMjzclO1f+9mDKjtR3R2YwZsFj3I2XWV6ECJDPM/OEqIV2oiiCqMtd9Cyq/s+1iWvu/JC2JRf2ETioVJdpxmMuamfo2Uz17Yv1cY55oudmCV99ipld37cBGFOvt3oI6skCJaKmOpZo7egeGXHfQ2vtaQSK1uCWiWwG3ONTjMZc1M/Rspnr2xfq46glmAF+IpGhqduSivhk/qQqCiompB2Ad4HK3zECtCr0KfbAZqIYHqprIMbPb2GnGYy5qZ+jZTPXti/Vx9BGelnK6jG1Cr/8oTEjR7yfAARLJrtCBf8AUQAiNE+3pQ2hfllUEEDPRIcMBwTjMZc1M/Rspnr2xfq4+kw+FRGLDW/+ZiF16LlDQajogiSsUbr200B6/wAyTqgFXgliuSVP4KIaLlUXm1TsDKh14T9cCgI2SXNTP0bKZ69sX6uPpO1h5R0RiJVWWL21TfyahKN4QNqiInRJSLr/ADI9eRGF0c8oTFCdR46n8EZQ7CdVFwmdo+IXi52t3SvT2YWsZ+jZTPXti/Vx9J2ug87m7IxklrocWSNKP+60QSbN+34y/m22Y+GaXZiMWqiiMo/bILe5mLduf4A6oKIlRIw4zu+CrHqXXcYZ0aGxgRRmtjwzP0bKZ69sX6uPpO10ZRHtL3IdlqeUoDwRRkdHjjdCFZFKNavd/m8bnxFgVIIdl0zABTelnuRzWtsXklr6Cj/AQcPLdmbc3H6YoaZ2Up7MCPIh94IEMUY7kMzmUtde2L9XH0na6LmZypnuKcM2HZ+wfYK4yzbKSOJbDsvRsyoeHslMvu9GnuTYH5/bAlSpxHdQR+use3ER95WE/wDxGUcZlU9jKeawGVMKz0lSU8j/AExFtU6CkIqCcabYv1cfSdrouZnCouzfuI/ybo6mSV3Aew/zzuykeNB26w7QXo2ErIh2oN0y7O68MoTn3/EUB9ynzkrx/JJ/AcIVxCHK9n9TUlSelI+ZK4hv8wjE0uCvZiG6PTucjHQR8IbUfhGWTH0na6LmZyxlVJl8x92zyP57FK1jyRiiKexhAZD0y7crgqSv8BQrAzyt/Zld9MlKUsvgb+8UhFkQo9USwHsYNZProNyUM/IQg6q2W+FoOqD0/fJVlZZT43lLiYDKj0AxJaDup+mMBnzoxsjr2ui5mcsZVeu4lQFH48CQ1E/nMdJQZDa8qn0JNF84GVl4g/AytL4T8TKCoDdA8Mo9OdT4ooxyrVNi8EveCgScB+EVYfXQYvCNwJCF5c/paVwVg1e5E2nMT5YOIDN+BgKodf8AzZQtMg7ncljouZnLGX5QHMOq3nf8+++nhI3rY/Qk3aowsNxIGlfJjdvChNTR/wDW1EWdtyoe8XKSWqexURsc8JUw71ohTgC2X+kG1g5H64VAYAm53L880y35KdGetGA8sBc7mjOWMu6ZXVh/Pdx6oEPNHCcjAPsg+sm70LEy0bIhiKr24Ve8V9TwO2IND90st5Cj3JXiHP8A0lBKQwb8lGBAT1/TYCDrj9tRO4vTYJZPq0DPq3OzKluSx7MdLbRN12RgtFZIEIpLGXdM2wBHahVDx/OYzUQ18ZXV33Hb1k3ehYmWpf6D8noZdQ/xeNU+MTCh1UHVSWuMbKE6tPtXEwN6pU2cL2XvG5u9BU8QSz9MAopiGJhnek89GUJX32CobBJd010YE7kFm6qv88h5PzEpzTYEcqolT1Ju9CxMvpgiBJVKAnWypuHYwQqyzaUs7EnzKWHranwxQ358JEUcn0RynTcFJfhm7ClaqoGXqtc2/j/z4qJHom7wZEJH33dvqTd6FiZfTBC2ZS/zpIUQSX+t12S9F/zcldaPo2fEJIJg19zaUw5zuvZlaTRywfW3ARIrRbU/mSr1b7kQpNKX2BDIACrkERqKYnJMgtzo+mbvQsTL6YIWzKX+dfDTZCHeOR7k3YH/AFcj2z+XuJWxGc63FAq6ogj6j6IlEY6+PNSvLt9hy7ZbEyQlPpx05iICJUfQbvQsTL6YIWzKX+dfD0yPARuMq6kzb7Qyjfe8kvje967qO4tuyIfqiVE9IJlAMGpb9I3atLcPsBigIjkYjWsV1Reg7Jjj0G70LEy+mCFsyl/nXw+hJKqfxxXE6bs7kp6ld3fvEbINhfbYAI+jaKSn9wgBEaI4SbmXPszrsD9hF6H2gNq1cYgt5sn9Ord6FiZfTBC2ZS/zr4fRkAN4JW7zvCVkFOZJ14MLt8MCDzFldE1SokZaV3szJZ+xuOrsE2yWEjdSnbsJ2M3xxCACJsku9CxMvpghbMpf518PoSLJfoFWVEKjG3BuV+0DoSi2eBEjDN2351GsN5cITVEUTokqjJ9jA9N5HqQui7tluIqh++7IOE3ucJ6FiZfTBG2ZS/zr4fQkWS/QxYw4JiNuEUTqVB+RlHey1oESIIkfe0biQgVbLq/ZCHGohUY8LLkJcPqicYDF6eWJFCOjEy+mCFsyl/nXw+hIsl+h1CSgNq6jIkRqdnknR9UzxAiVPtHRTd3zG5MJ18ukWC59+N3xw93aD6CMy+mCFsyl/nXw+hIsl+h9ADJTDldSLq16nkjjbpRsPtKgCPWXHWTv7w+AbQXylP8AzWDIZItC/wDIaLvoE7ZlL/Ovh9CRZL9D6Uvj3vkUVJawHwkNoBBxdH2odASUFq/+onZ1n9bB5bKoyowng1fclFHMwjio8qex9eFsyl/nXw+hIsl+h9QdegD3/qIu3469RjkGzZnIfbFrncQjjyB+FjS/zPZiQpjdA8MplCGFqezKOG+6Uwa8CfG13fMYlRE0W6L/ADr4fQkWS/Q+sNvodv7m5HQcDiHYqJX7cegpKqArnX7xV+EEEZXDlk0nIFH3qiAXOikzAeUpN522mQEA7uYxsjpw+hIsl+h9YYECokbMN4XcZAfcle4TZ84DiuO6ysVh4EP/ADGlI7rlYXHb/azg4SL5n7Z1l485/wCQ985VZTxT6JPhZD6Ysl+h9abOGvcI7jaPVXIGIZ7H7sg4ics3EElbo1ya/eF3x9KAl6cLNXWmyENe/f8AaMlDwtHsylBfaqKg9lJIg89VPYxibMv0PrTZy1gNSzGzXd374kFVxSBIS3Gv3ivm8DSVZPhPxQg7XlflaMFKGb8EOgTLVezFRW58KyD6xs5a6SfUCc1eL3UCPf7+MiWOlvN+IB2dQaaQ/wDRI2BD/wAFnyB49p37c9LZy1l+jL6rV+BBIDCSry4sQOLEW0biblKXh1ryJ2Glc7mtnLWX6Uqi9kfgvDiKUHZJVZvWjFdF2iNUdxlJRgNvMNARskzlrL9H5QB4ZYMA8n4MgDpKDt2mIMLFv2JTHUHbxHe4yrktZfruvKfg9sAjGDXFib5somySywPeX6qs7GTn8JJSAts+GL/Rs4TqMTqNUqtBHahVD+EsiAWrqU8o7A6mqEXMeGKNr84fhSGkbmYYyakJ+zXqYz8fhdOgVeGAQQNEcJ+GvxKy2hKExoOYb+GQwSgPRhsNFXqFpRcPw0GxbstUuQd0XZ/9F5//2Q==';
};

function addPnr(doc,formData,start,line){
    doc.setFontSize(7);
    var pnr = formData.get("pnrNumber");
    doc.text("PNR/Booking Ref.",start,line);
    var temp = start+160;
    doc.text("Date of Booking",temp,line);
    line=line+6;
    doc.setFontSize(12);
    doc.text(formData.get("pnrNumber"),start,line);
    doc.text(formatDate(formData.get("bookDate")),temp,line);
    return pnr;
};

function addBookingDetails(doc,formData,start,line){ 
    line=line+10;
    doc.setTextColor('#ff3399');
    doc.setFontStyle('bold');
    doc.text("Booking Details",start, line);
    doc.setTextColor("#000000");
    doc.setFontStyle('normal');
    line = line+5;
    doc.setFillColor(15,15,15,15);
    doc.setLineWidth(0.5);
    /*doc.line(start-5,line,start-5,120); // start vertical line
    doc.line(200,line,200,120); // end vertical line
    doc.line(start-5, line, 200, line); // upper horizontal line
    doc.line(200, 120, start-5, 120); // lower horizontal line*/
    doc.rect(start-5,line,195,60);
    var title = document.querySelector('#titleName').value;
    var fName = formData.get('fName');
    var mName = formData.get('mName');
    var lName = formData.get('lName');
    var name =  " " + fName + " " + mName + " " + lName;
    line=line+10;
    doc.setFontSize(16);
    doc.setFontStyle('bold');
    doc.text(title+convertToUpperCase(name),start,line);

    doc.setFontSize(14);
    var tempS = start+150;
    doc.setTextColor("#000000");
    doc.text("Seat : ",tempS,line);
    tempS = tempS+15;
    //doc.setTextColor("#0000ff");
    doc.text(convertToUpperCase(formData.get("seatNumber")),tempS,line);
    line=line+10;
    doc.setFontStyle('normal');
    doc.setFontSize(8);
    doc.setTextColor("#000000");
    doc.text("Airline",start,line);
    var tempHead = line;
    var tempValue=line+6;
    doc.setFontSize(12);
    //doc.setTextColor("#0000ff");
    doc.text(convertToUpperCase(formData.get("airlineName")),start,tempValue);
    line=line+10;
    var tempStart = start+50;
    doc.setFontSize(8);
    doc.setTextColor("#000000");
    doc.text("Flight No.",tempStart,tempHead);
    line=line+6;
    doc.setFontSize(12);
    //doc.setTextColor("#0000ff");
    doc.text(convertToUpperCase(formData.get("flightNumber")),tempStart,tempValue);
    line=line+10;
    doc.setFontSize(8);
    tempStart = tempStart + 50;
    doc.setTextColor("#000000");
    doc.text("From",tempStart,tempHead);
    line=line+6;
    doc.setFontSize(12);
    //doc.setTextColor("#0000ff");
    doc.text(convertToUpperCase(formData.get("from")),tempStart,tempValue);
    line=line+10;
    doc.setFontSize(8);
    tempStart = tempStart + 50;
    doc.setTextColor("#000000");
    doc.text("To",tempStart,tempHead);
    line=line+6;
    doc.setFontSize(12);
    //doc.setTextColor("#0000ff")
    doc.text(convertToUpperCase(formData.get("to")),tempStart,tempValue);
    
    tempHead = tempHead + 18;
    tempValue=tempValue + 18;
    tempStart = start;
    doc.setFontSize(8);
    doc.setTextColor("#000000");
    doc.text("Departure Date",tempStart,tempHead);
    line=line+6;
    doc.setFontSize(12);
    //doc.setTextColor("#0000ff");
    doc.text(formatDate(formData.get("depDate")),tempStart,tempValue);
    doc.setFontSize(8);
    tempStart = tempStart + 50;
    doc.setTextColor("#000000")
    doc.text("Departure Time",tempStart,tempHead);
    line=line+6;
    doc.setFontSize(12);
    //doc.setTextColor("#0000ff");
    doc.text(formData.get("depTime")+" hrs",tempStart,tempValue);
    doc.setFontSize(8);
    tempStart = tempStart + 50;
    doc.setTextColor("#000000")
    doc.text("Arrival Date",tempStart,tempHead);
    line=line+6;
    doc.setFontSize(12);
    //doc.setTextColor("#0000ff");
    doc.text(formatDate(formData.get("arrDate")),tempStart,tempValue);
    doc.setFontSize(8);
    tempStart = tempStart + 50;
    doc.setTextColor("#000000")
    doc.text("Arrival Time",tempStart,tempHead);
    line=line+6;
    doc.setFontSize(12);
    //doc.setTextColor("#0000ff")
    doc.text(formData.get("arrTime")+" hrs",tempStart,tempValue);

    return fName;
};

function addFareDetails(doc,formData,start,line){
    doc.setTextColor('#ff3399');
    doc.setFontStyle('bold');
    doc.text("Fare Details",start, line);
    doc.setFontStyle('normal');
    doc.setTextColor("#000000");
    line = line+5;
    doc.line(start-5,line,start-5,200); // start vertical line
    doc.line(200,line,200,200); // end vertical line
    doc.line(start-5, line, 200, line); // upper horizontal line
    doc.line(200, 200, start-5, 200); // lower horizontal line
    line = line+20;
    doc.text("flight fare ",start,line);
    const flightFare = parseFloat(formData.get("flightFare"));
    doc.text("INR "+flightFare+"/-",start+100,line);
    line = line+10;
    doc.text("charges ",start,line);
    const charges = parseFloat(formData.get("allCharges"));
    doc.text("INR "+charges+"/-",start+100,line);
    line = line+12;
    doc.setLineWidth(0);
    doc.line(start-2, 184, 195, 184);
    doc.setTextColor("#ff0000")
    doc.text("total Fare ",start,line);
    const total = flightFare+charges;
    doc.text("INR "+total+"/-",start+100,line);
};

function addFareDetail(doc,formData,start,line){
    line = line+15;
    doc.setTextColor('#ff3399');
    doc.setFontStyle('bold');
    doc.text("Fare Details",start, line);
    doc.setTextColor("#000000")
    line = line+5;

    doc.rect(start-5,line,195,40);
    line = line+5;
    const flightFare = parseFloat(formData.get("flightFare"));
    const charges = +parseFloat(formData.get("allCharges"));
    const total = +flightFare+charges;
    const headers = ["Fare Type", "Amount (in rupees)"];
    const rows = [
        ["Flight Fare", flightFare+"/-"],
        ["Charges", charges+"/-"],
        ["Total Fare", total+"/-"]
    ];

    // Set the table options
    const options = {
        startY: line,
        headStyles: {
            fillColor: [255,51,153]
            },
        didParseCell: function (data) {
            var rows = data.table.body;
            
            if (data.row.index === rows.length - 1) {
                data.cell.styles.fillColor = [51, 255, 255];
                //data.cell.styles.fillColor = [100,100,100];
            }
        } // Vertical position to start the table (in mm)
    };

    // Generate the table
    doc.autoTable(headers, rows, options);

}

function addWaterMark(doc,imgData) {
    doc.setGState( new doc.GState({"opacity": 0.5, "stroke-opacity": 0.5}));
    
    var totalPages = doc.internal.getNumberOfPages();
  
    for (i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
      doc.setTextColor(150);
      doc.text(50, doc.internal.pageSize.height - 30, 'Watermark');
    }
    doc.restoreGraphicsState();
    return doc;
  }

function convertToUpperCase(str){

    if(str===null || str===undefined){
        return "";
    }
    return str.toUpperCase();

};

function formatDate(value) {
    if (value===null || value == undefined){
        return "";
    }
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
}

function footer(doc,start){ 
    doc.setTextColor("#000000")
    doc.setFontStyle('normal');
    doc.setFontSize(7);
    doc.text(start,290, 'This ticket is sytem generated.'); //print number bottom right
    doc.text(190,290, 'page ' + doc.page); //print number bottom right
    doc.page ++;
};