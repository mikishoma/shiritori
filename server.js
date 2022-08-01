import { serve } from "https://deno.land/std@0.138.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";

// document.write("<script src=\"test.js\"></script> ");

 //ランダムの文字
 // 生成する文字列の長さ
 var l = 1;
 // 生成する文字列に含める文字セット
 var c = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ";

 var cl = c.length;
 var r = "";
 for(var i=0; i<l; i++){
   r += c[Math.floor(Math.random()*cl)];
 }
 
const word = [];
var previousWord =r;
console.log("Listening on http://localhost:8000");

serve(async req => {
    const pathname = new URL(req.url).pathname;
    console.log(pathname);
    

    if (req.method === "GET" && pathname === "/shiritori") {
        return new Response(previousWord);
      }

    if (req.method === "POST" && pathname === "/shiritori") {
      // reload();
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;
        //リセットを押したら
        if(nextWord==1){
        //ランダムの文字
        // 生成する文字列の長さ
        var l = 1;
        // 生成する文字列に含める文字セット
        var c = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ";
        var cl = c.length;
        var r = "";
        for(var i=0; i<l; i++){
          r += c[Math.floor(Math.random()*cl)];
        }

          word.length = 0;
          previousWord =r;
          return new Response(previousWord);
        }


        //「ん」で終わったとき
        if(nextWord.charAt(nextWord.length -1)=="ん"){
          return new Response("「ん」で終わりました。",{ status: 400 });
        }

        // ひらがなチェック
        if (nextWord.match(/^[ぁ-んー　]+$/)) {      
          //ひらがな
          ;
        } else {
          //ひらがな以外
          return new Response("ひらがな以外が混じっています。",{ status: 400 });
        }

      
        if (
          nextWord.length == 0 ||
          previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)
        ) {
          return new Response("前の単語に続いていません。", { status: 400 });
        }

        else{
        let length=word.length;
        for(let i=0; i<length; i++){
          if(word[i]==nextWord){
            return new Response("すでに使われた単語です。",{ status: 400 });
          }
         else{
          ;
         }
        }
        }
        // if(word.length >= 1){
        //   previousWord = word.slice(-1)[0];
        // }
        word.push(nextWord);
        previousWord = nextWord;
        return new Response(previousWord);
        }

    return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
      });

   
});




