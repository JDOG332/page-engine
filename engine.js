(function(){
var VERSION="6.0.0";
var FORM="<div id=\"qp-stash\" style=\"position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none\" aria-hidden=\"true\"><form class=\"elicit\"><div class=\"elicit-header\"><svg viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M11.586 2a1.5 1.5 0 0 1 1.06.44l2.914 2.914a1.5 1.5 0 0 1 .44 1.06V16.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.492-1.347L4 16.5v-13A1.5 1.5 0 0 1 5.5 2zM5.5 3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h-2.5A1.5 1.5 0 0 1 11 5.5V3zm7.04 10.304a.5.5 0 0 1 .92.392c-.295.69-.871 1.304-1.66 1.304-.487 0-.892-.234-1.2-.574-.309.34-.713.574-1.2.574-.486 0-.892-.233-1.2-.574-.31.34-.714.574-1.2.574a.5.5 0 0 1 0-1c.212 0 .52-.18.74-.696l.034-.067a.5.5 0 0 1 .886.067c.221.516.528.696.74.696.213 0 .52-.18.74-.696l.035-.067a.5.5 0 0 1 .885.067c.22.516.527.696.74.696s.519-.18.74-.696m0-4a.5.5 0 0 1 .92.392c-.295.69-.871 1.304-1.66 1.304-.487 0-.892-.234-1.2-.574-.309.34-.713.574-1.2.574-.486 0-.892-.233-1.2-.574-.31.34-.714.574-1.2.574a.5.5 0 0 1 0-1c.212 0 .52-.18.74-.696l.034-.067a.5.5 0 0 1 .886.067c.221.516.528.696.74.696.213 0 .52-.18.74-.696l.035-.067a.5.5 0 0 1 .885.067c.22.516.527.696.74.696s.519-.18.74-.696M12 5.5a.5.5 0 0 0 .5.5h2.293L12 3.207z\"/></svg><span>Answer details</span></div><div class=\"elicit-body\"><div class=\"elicit-group\"><label class=\"elicit-question\">Screenshots</label><div class=\"elicit-files\" data-name=\"screenshots\"><label class=\"elicit-dropzone\"><svg viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M16.5 13a.5.5 0 0 1 .5.5v2a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 15.5v-2a.5.5 0 0 1 1 0v2a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 .5-.5M10 3a.5.5 0 0 1 .374.168l4 4.5.059.082a.5.5 0 0 1-.732.65l-.075-.068L10.5 4.814V13.5a.5.5 0 0 1-1 0V4.814L6.374 8.332a.5.5 0 0 1-.748-.664l4-4.5.08-.071A.5.5 0 0 1 10 3\"/></svg><span>Choose file</span><input type=\"file\" multiple></label></div><textarea class=\"elicit-textarea\" data-name=\"answers\" placeholder=\"answers\"></textarea></div></div><div class=\"elicit-footer\"><button type=\"button\" class=\"elicit-skip\">Skip</button><button type=\"button\" class=\"elicit-submit\">Send</button></div></form></div>";
var PAL={
light:{accent:"#24426f",chosen:"#d4def0",bg:"#eef1f5",card:"#fbfcfd",soft:"#f3f5f8",line:"#d3d9e2",ink:"#232831",muted:"#6b717a",on:"#ffffff",fin:"#1d2330",fini:"#ffffff",lock:"#9a6b12",lockbg:"#faf3e4"},
dark:{accent:"#a3bdea",chosen:"#3f5578",bg:"#232934",card:"#2c3341",soft:"#313946",line:"#434c5c",ink:"#e8e6e1",muted:"#a7adb6",on:"#232934",fin:"#e8e6e1",fini:"#232934",lock:"#e0b660",lockbg:"#3a3428"}};
var CSS=
".qp{box-sizing:border-box;position:relative;background:var(--bg);color:var(--ink);font:19.5px/1.4 'Source Sans 3',system-ui,-apple-system,sans-serif;border-radius:16px;padding:8px;display:flex;flex-direction:column}"+
".qp *{box-sizing:border-box;font-size:inherit}"+
".qp .ct{display:flex;flex-direction:column;gap:16px;padding:8px}"+
".qp .sec{flex:none;display:flex;flex-direction:column;gap:8px;padding:8px;border:1.5px solid var(--line);border-top:4px solid var(--accent);border-radius:14px;background:var(--soft)}"+
".qp .sec.lock{border:2px solid var(--lock);border-left:8px solid var(--lock);background:var(--lockbg)}"+
".qp .ex{flex:none;border:1px solid var(--line);border-radius:10px;background:var(--card)}"+
".qp .s{min-height:48px;padding:8px;display:flex;align-items:center;gap:8px;cursor:pointer;touch-action:pan-y;-webkit-tap-highlight-color:transparent}"+
".qp .s::after{content:'\\25C2';color:var(--accent);margin-left:auto;flex:none;padding-left:8px}"+
".qp .ex.open>.s::after{content:'\\25BE'}.ex.flat>.s{cursor:default}.ex.flat>.s::after{content:''}"+
".qp .ex.qh.has>.s::after{content:'\\25CF  \\25C2'}.qp .ex.qh.has.open>.s::after{content:'\\25CF  \\25BE'}"+
".qp .hi{display:flex;align-items:flex-start;gap:8px;min-width:0;flex:1}"+
".qp .em{flex:none;width:1.5em;text-align:center}.qp .tx{flex:1;min-width:0}"+
".qp .qt,.qp .td>.s{font-weight:700}"+
".qp .w{display:grid;grid-template-rows:0fr;transition:grid-template-rows .15s ease}"+
".qp .open>.w{grid-template-rows:1fr}"+
".qp .w>.m{overflow:hidden;min-height:0}"+
".qp .in{padding:0 8px 8px 8px;display:flex;flex-direction:column;gap:8px;line-height:1.45}"+
".qp .in p{margin:0}.qp .in>.sep{border-top:1px solid var(--line);padding-top:8px}"+
".qp .in .ex{background:var(--soft)}"+
"@media (prefers-reduced-motion:reduce){.qp .w{transition:none}}"+
".qp .snap>.w{transition:none}.qp .qanc{position:absolute;left:0;width:1px;height:1px;pointer-events:none}.qp .qlow,.qp .qtop{flex:none;height:0}.qp,.qp *{overflow-anchor:none}"+
".qp .box{flex:none;width:28px;height:28px;border:2px solid var(--accent);border-radius:7px;display:inline-flex;align-items:center;justify-content:center;color:var(--on);cursor:pointer}"+
".qp .td.done .box{background:var(--accent)}.qp .td.done>.s .tx{color:var(--muted);text-decoration:line-through}"+
".qp .op{flex:none;display:flex;flex-direction:column;border:1.5px solid var(--line);border-radius:10px;background:var(--card);cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:pan-y}"+
".qp .op.pick{border:2.5px dashed var(--accent)}"+
".qp .op[aria-pressed=true]{border:2.5px solid var(--accent);background:var(--chosen)}"+
".qp .op .row{display:flex;align-items:center;min-height:48px}"+
".qp .op .lb{flex:1;min-width:0;padding:8px;display:flex;align-items:center;gap:8px}"+
".qp .op[aria-pressed=true] .lb::before{content:'\\2713';color:var(--accent);font-weight:700;flex:none}"+
".qp .op .mo{flex:none;width:40px;height:40px;margin:4px 8px 4px 0;border:1.5px solid var(--line);border-radius:10px;background:var(--soft);color:var(--accent);display:flex;align-items:center;justify-content:center}"+
".qp .op .mo::before{content:'\\25C2'}.qp .op.open .mo::before{content:'\\25BE'}"+
".qp .op .in{border-top:1px solid var(--line);padding-top:8px;font-weight:400}"+
".qp .pr{flex:none;display:flex;flex-direction:column;gap:8px;border:1.5px solid var(--line);border-radius:10px;padding:8px;background:var(--card)}"+
".qp .g2{display:grid;grid-template-columns:1fr 1fr;gap:8px}.qp .g5{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}"+
".qp .bt{font:inherit;font-weight:600;min-height:48px;padding:0 8px;border:1.5px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);cursor:pointer;touch-action:pan-y;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"+
".qp .bt.pick{border:2.5px dashed var(--accent)}"+
".qp .bt[aria-pressed=true]{border:2.5px solid var(--accent);background:var(--chosen)}.qp .bt[aria-pressed=true]::before{content:'\\2713\\00a0\\00a0';color:var(--accent);font-weight:700}"+
".qp .ends{display:flex;justify-content:space-between;color:var(--muted);margin:0}"+
".qp .dg{flex:none;display:flex;align-items:center;gap:8px;min-height:48px;padding:0 8px;border:1.5px solid var(--line);border-radius:10px;background:var(--card);touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab}"+
".qp .dg.lift{position:relative;z-index:3;border-color:var(--accent);box-shadow:0 6px 18px rgba(0,0,0,.25)}"+
".qp .dg .num{flex:none;width:1.5em;text-align:center;font-weight:700;color:var(--accent)}.qp .dg .hdl{margin-left:auto;color:var(--muted)}"+
".qp .rk .badge{flex:none;width:28px;height:28px;border-radius:50%;border:2px solid var(--muted);display:inline-flex;align-items:center;justify-content:center;font-weight:700}"+
".qp .rk[aria-pressed=true] .badge{background:var(--accent);border-color:var(--accent);color:var(--on)}"+
".qp .rk{display:flex;align-items:center;gap:8px;text-align:left}"+
".qp .cp{display:flex;gap:8px;align-items:center}"+
".qp .cp pre{flex:1;min-width:0;margin:0;padding:8px;overflow-wrap:anywhere;background:var(--bg);border:1.5px solid var(--line);border-radius:10px;font:15px/1.45 ui-monospace,Menlo,monospace;white-space:pre-wrap;color:var(--ink);user-select:all}"+
".qp .cp button,.qp .send{font:inherit;font-weight:700;border:0;cursor:pointer;background:var(--accent);color:var(--on);border-radius:10px}"+
".qp .cp button{flex:none;height:48px;padding:0 16px}"+
".qp textarea{width:100%;min-height:96px;font:inherit;color:var(--ink);background:var(--card);border:1.5px solid var(--line);border-radius:10px;padding:8px;resize:none;line-height:1.35}"+
".qp textarea:focus{border-color:var(--accent);outline:none}.qp textarea::placeholder{color:var(--muted);opacity:.55}"+
".qp .nrow{display:flex;align-items:center;gap:8px}.qp .nrow .at{font:inherit;height:40px;padding:0 16px;border-radius:10px;border:1.5px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer}"+
".qp .nrow .at.has{border-color:var(--accent);color:var(--accent)}.qp .nrow .ns{color:var(--muted);flex:1;min-width:0}"+
".qp .thumbs{display:flex;flex-wrap:wrap;gap:8px}.qp .thumbs:empty{display:none}.qp .th{position:relative}.qp .th img{display:block;height:80px;max-width:160px;object-fit:cover;border-radius:8px;border:1.5px solid var(--line)}.qp .th button{position:absolute;top:-8px;right:-8px;width:26px;height:26px;border-radius:50%;border:1.5px solid var(--line);background:var(--card);color:var(--ink);font:inherit;font-size:14px;line-height:1;cursor:pointer}"+
".qp .after{margin:0;color:var(--muted);opacity:.8;text-align:center}"+
".qp .send{flex:none;min-height:52px;background:var(--fin);color:var(--fini)}"+
".qp .bar{display:none;min-height:48px;align-items:center;justify-content:center;gap:8px;font-weight:700;cursor:pointer}"+
".qp.sent .ct{display:none}.qp.sent .bar{display:flex}"+
".qp.drop{outline:3px dashed var(--accent);outline-offset:-3px}"+
".qp .stash{position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none}"+
".qp .sec.idea{padding:0}.qp .sec.idea>.ex{border:0;background:transparent}"+
".qp .ih{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}.qp .ih .it{font-weight:700}"+
".qp .ih .il{color:var(--muted)}"+
".qp .sec.idea>.ex>.w>.m>.in{gap:12px;padding:0 8px 12px 8px}"+
".qp .ak{display:flex;flex-direction:column;gap:8px;border-top:1px solid var(--line);padding-top:12px}.qp .ak.lock{border:2px solid var(--lock);border-left:8px solid var(--lock);background:var(--lockbg);border-radius:10px;padding:8px}"+
".qp .ak .aq{font-weight:700}.qp .st{border-top:1px solid var(--line);padding-top:12px;display:flex;flex-direction:column;gap:8px}"+
".qp .inote{border-top:1px solid var(--line);padding-top:12px}.qp .inote>.in{padding:0}.qp .icl{font:inherit;align-self:stretch;min-height:44px;padding:0 14px;border:1.5px solid var(--line);border-radius:10px;background:transparent;color:var(--muted);cursor:pointer}"+
".qp .cap{color:var(--muted);font-weight:400}.qp .cap.full{color:var(--accent);font-weight:600}"+
".qp .nm{display:grid;grid-template-columns:56px 1fr 56px;gap:8px}.qp .nm .bt{font-size:1.3em}"+
".qp input.nv{font:inherit;font-weight:600;min-height:48px;width:100%;box-sizing:border-box;text-align:center;border:1.5px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);padding:0 8px}"+
".qp input.nv.pick{border:2.5px dashed var(--accent)}.qp input.nv.set{border:2.5px solid var(--accent);background:var(--chosen)}.qp input.nv:focus{outline:none;border-color:var(--accent)}.qp input.nv::placeholder{color:var(--muted);opacity:.8}"+
".qp .gq{display:flex;flex-wrap:wrap;gap:8px}.qp .gq .bt{flex:1 1 auto}.qp .nu{color:var(--muted);text-align:center}"+
".qp textarea.tx.set{border-color:var(--accent)}"+
".qp .qn{font:inherit;align-self:flex-start;min-height:40px;padding:0 14px;border:1.5px solid var(--line);border-radius:10px;background:transparent;color:var(--muted);cursor:pointer}.qp .qn.has{border-color:var(--accent);color:var(--accent);font-weight:600}"+
".qp .qnb{display:none}.qp .qnb.on{display:block}.qp .qnb>.in{padding:0}.qp .qnb textarea{min-height:64px}";
var KC=["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"];
var EMO=/^([\p{Extended_Pictographic}\p{Emoji_Component}⃣️‍\d]+)\s+(\S[\s\S]*)$/u;
var DN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],MAXSHOTS=10;
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function rich(e,t){String(t||"").split("**").forEach(function(p,i){if(!p)return;e.appendChild(i%2?el("b",null,p):document.createTextNode(p))});return e}
function lbl(t,tag,c){var e=el(tag||"span",c),m=null;try{m=EMO.exec(t||"")}catch(x){}if(m&&/[\p{Extended_Pictographic}⃣]/u.test(m[1])){e.classList.add("hi");e.append(el("span","em",m[1]),rich(el("span","tx"),m[2]))}else rich(e,t);return e}
function first(t){var m=null;try{m=EMO.exec(t||"")}catch(x){}return m?m[1]:""}
function syncCopy(text){var ok=false;try{var t=document.createElement("textarea");t.value=text;t.style.position="absolute";t.style.opacity="0";document.body.appendChild(t);t.select();ok=document.execCommand("copy");t.remove()}catch(e){}if(!ok){try{navigator.clipboard.writeText(text);ok=true}catch(e){}}return ok}
function go(u){try{if(typeof openLink==="function"){openLink(u);return}}catch(e){}try{window.open(u,"_blank","noopener")}catch(e){}}
function dval(d,t){return DN[d.getDay()]+" "+(d.getMonth()+1)+"/"+d.getDate()+(d.getFullYear()!==t.getFullYear()?"/"+d.getFullYear():"")}
var KEYCAP_RX="[1-9]️?⃣";
function guessKind(q){if(q.kind)return q.kind;if("options" in q)return "decide";if("ends" in q)return "scale";if(q.items&&q.items.length&&typeof q.items[0]==="object"&&q.items[0])return "pair";var rows=q.rows||[];if(rows.length&&new RegExp("^"+KEYCAP_RX).test(rows[0].s||""))return "todo";return "report"}
function fixPair(q){if(q.kind==="pair"){q.items=(q.items||[]).map(function(it){it=Object.assign({},it);var p=it.pick;if((p==="a"||p==="b")&&p!==it.a&&p!==it.b)it.pick=it[p];return it})}return q}
function codeQ(q){var o=[{label:"Not yet",more:q.wait||"Nothing changes."},{label:"🔐 Approve "+q.code+": "+q.action,more:q.more||q.action}];var r={id:q.id,kind:"decide",code:true,q:q.q,options:o};if(q.rows!=null)r.rows=q.rows;return r}
function memRows(ms){return(ms||[]).map(function(m){var inner=[{p:(m.was?"Updated ":"Added to ")+m.file},{c:m.line}];if(m.was)inner.push({p:"Was: "+m.was});var b=String(m.file||"").split("/").pop().replace(/\.md$/,"");return{s:"🧠 "+b+(m.sha?" "+m.sha:""),m:inner}})}
function emptyM(m){return m==null||(typeof m==="string"&&!m.trim())||(Array.isArray(m)&&!m.length)}
function tidyRows(rows){return(rows||[]).map(function(x){if(x==null||typeof x!=="object")return x;x=Object.assign({},x);if("m" in x){if(emptyM(x.m))delete x.m;else if(Array.isArray(x.m))x.m=tidyRows(x.m)}return x})}
function prepQ(q){q=Object.assign({},q);if(q.rows!=null)q.rows=tidyRows(q.rows);if(q.kind==="code")q=codeQ(q);if(q.kind==="multi"){q.kind="decide";q.multi=true}q.kind=guessKind(q);fixPair(q);return q}
function prep(R){if(R._prepped)return R;R=Object.assign({},R);var n=0;
 if(R.ideas!=null){R.ideas=R.ideas.map(function(I){I=Object.assign({},I);var rows=tidyRows(I.rows).concat(memRows(I.mem));delete I.mem;if(I.steps!=null)I.steps=tidyRows(I.steps);
  var asks=(I.asks||[]).map(function(q){q=prepQ(q);n++;if(!q.id)q.id="q"+n;if(q.rows==null)delete q.rows;return q});I.rows=rows;I.asks=asks;return I}).filter(function(I){return I.rows.length||I.asks.length||(I.steps||[]).length})}
 var out=[],report=null;(R.screens||[]).forEach(function(q){q=prepQ(q);if(q.kind==="report"&&!report)report=q;out.push(q)});
 if(!report&&R.ideas==null&&R.mem){report={kind:"report",rows:[]};out.unshift(report)}
 if(report){report.rows=tidyRows(report.rows).concat(memRows(R.mem))}
 var f=R.finish;if(f&&(typeof f!=="object"||(f.kind!=="delete"&&f.kind!=="keep"))){R._finbad=(typeof f==="object")?Object.keys(f).join(", "):String(f);f=null}if(f&&f.after){var ok=f.kind==="delete",ii=R.ideas||[],tgt=null;for(var j=ii.length-1;j>=0;j--){if((ii[j].steps||[]).length){tgt=ii[j];break}}if(!tgt&&ii.length)tgt=ii[ii.length-1];if(tgt){tgt.steps=(tgt.steps||[]).concat([{id:"fin",s:(ok?"🗑️ Safe to delete after ":"💾 Safe to close after ")+f.after,m:ok?"Pickup point: "+(f.pickup||"nothing to pick up"):(f.why||f.pickup||"Worth keeping to look back at.")}])}R._after=true;f=null}if(R.open)R._open=String(R.open);
 var f2=f;if(f2)R._finish=true;f=f2;if(f){var v,inner;if(f.kind==="delete"){v="🗑️ Safe to close & delete";inner=[{p:"Pickup point: "+(f.pickup||"nothing to pick up")}]}else{v="💾 Safe to close, keep this chat";inner=[{p:f.why||f.pickup||"Worth keeping to look back at."}]}out.push({kind:"report",rows:[{s:v,m:inner}]})}
 out.forEach(function(q,i){if(!q.id)q.id="s"+(i+1);if(q.rows==null)delete q.rows});
 ["mem","title","finish","theme","open"].forEach(function(k){delete R[k]});R.screens=out;R._prepped=true;return R}
var KINDS=["report","todo","decide","do","pair","rank","drag","scale","date","number","text","check"],QKINDS=KINDS.slice(2);
var EMO_CK=new RegExp("^(?:"+KEYCAP_RX+"|[^\\p{L}\\p{N}_\\s]\\S*)\\s+\\S","u");
function rowsOk(rows,w,bad,emoji){(rows||[]).forEach(function(x){if(!("p" in x||"c" in x||"s" in x))bad(w,"row needs p, c or s");
 if("s" in x){if(emoji&&!EMO_CK.test(x.s||""))bad(w,"row needs its emoji and a space first: "+String(x.s).slice(0,30));var m=x.m;
  if(m!=null&&((typeof m==="string"&&!m.trim())||(Array.isArray(m)&&!m.length)))bad(w,"row with an empty dropdown: "+String(x.s).slice(0,30));
  if(Array.isArray(m))rowsOk(m,w+" > "+String(x.s).slice(0,18),bad,emoji)}})}
function check(R,errs){errs=errs||[];function bad(w,m){errs.push(w+": "+m)}
 if(R._finbad!=null)bad("finish",'kind must be "delete" or "keep" (keys given: '+R._finbad+')');
 if(!/^[a-z]{2,8}\d{1,4}$/.test(R.round||""))bad("round","id must look like iqp18");
 if(R.ideas!=null)return checkIdeas(R,errs,bad);
 var sc=R.screens||[];if(!sc.length)bad("screens","none");var ids={};
 sc.forEach(function(q,i){var w="screen "+(i+1),k=q.kind;if(KINDS.indexOf(k)<0)bad(w,"unknown kind "+k);
  if(!q.id||ids[q.id])bad(w,"missing or repeated id");ids[q.id]=1;
  if(JSON.stringify(q).indexOf("—")>=0)bad(w,"em dash");
  if(k==="report"||k==="todo"){if(!(q.rows||[]).length)bad(w,k+" with no rows");rowsOk(q.rows,w,bad,true)}
  var isQ=QKINDS.indexOf(k)>=0;if(isQ&&q.rows&&q.rows.length)rowsOk(q.rows,w,bad,false);
  if(isQ&&!String(q.q||"").trim())bad(w,"question needs a short title in q");
  if(k==="decide"||k==="do"){var o=q.options||[],p=o.filter(function(x){return x.pick});if(q.multi){if(o.length<2||o.length>8)bad(w,"pick-several needs 2 to 8 options");if(q.max!=null&&!(q.max>=1&&q.max<o.length&&q.max%1===0))bad(w,"max must be a whole number from 1 to one less than the options")}else if(o.length<2||o.length>4)bad(w,"needs 2 to 4 options");
   if(q.code){if(p.length)bad(w,"code screens take no Claude pick");var cm=/^\uD83D\uDD10 Approve (.*?): ([\s\S]*)$/.exec(String((o[1]||{}).label||""));if(!cm||!/^\d{4}$/.test(cm[1]))bad(w,"code must be 4 digits");if(!cm||!cm[2].trim()||cm[2]==="undefined")bad(w,"code ask needs its action");if(!o.length||String(o[0].label||"").toLowerCase().indexOf("not yet")<0)bad(w,"code screens start with Not yet")}
   else if(q.multi){if(q.max!=null&&p.length>q.max)bad(w,"more Claude picks than max")}else{if(p.length!==1)bad(w,"needs exactly one Claude pick");var sk=o.map(function(x){return String(x.label||"").trim().toUpperCase()}).indexOf("SKIP QUESTION");if(k==="decide"&&sk<0)bad(w,"needs SKIP QUESTION as its last option");else if(sk>=0&&sk!==o.length-1)bad(w,"SKIP QUESTION must be the last option")}}
  if(k==="pair"){var it=q.items||[];if(it.length<1||it.length>4)bad(w,"pair needs 1 to 4 items");
   it.forEach(function(x){if(!(x.id&&x.text&&x.a&&x.b))bad(w,"pair item needs id, text, a, b");else if(x.pick!==x.a&&x.pick!==x.b)bad(w,'pair item "'+String(x.text).slice(0,30)+'": pick must be exactly "'+x.a+'" or "'+x.b+'"')})}
  if((k==="rank"||k==="drag")&&((q.items||[]).length<2||(q.items||[]).length>6))bad(w,"needs 2 to 6 items");
  if(k==="scale"&&(q.ends||[]).length!==2)bad(w,"needs two end labels");
  if(k==="number"){["min","max","step","pick"].forEach(function(f){if(q[f]!=null&&typeof q[f]!=="number")bad(w,f+" must be a number")});if(q.min!=null&&q.max!=null&&q.min>=q.max)bad(w,"min must be below max");if(q.pick!=null&&((q.min!=null&&q.pick<q.min)||(q.max!=null&&q.pick>q.max)))bad(w,"pick is outside min to max");if(q.quick!=null&&(!Array.isArray(q.quick)||q.quick.length>6||q.quick.some(function(v){return typeof v!=="number"})))bad(w,"quick must be up to 6 numbers")}
  if(k==="check"){var ci=q.items||[];if(ci.length<2||ci.length>8)bad(w,"check needs 2 to 8 items");if(ci.some(function(x){return typeof x!=="string"||!x.trim()}))bad(w,"check items are short text");if(q.pick!=null&&(!Array.isArray(q.pick)||q.pick.some(function(p){return ci.indexOf(p)<0})))bad(w,"check pick must list items it has")}
  if(k==="text"&&q.ph!=null&&typeof q.ph!=="string")bad(w,"ph must be text");if(q.sug!=null&&(typeof q.sug!=="string"||!q.sug.trim()))bad(w,"sug must be text");if(q.sug!=null&&q.code)bad(w,"code screens take no sug")});return errs}
function checkIdeas(R,errs,bad){var I=R.ideas||[];if(!I.length)bad("ideas","none");var seen={};
 I.forEach(function(x,i){var w="idea "+(i+1);if(JSON.stringify(x).indexOf("—")>=0)bad(w,"em dash");if(!String(x.t||"").trim())bad(w,"needs a short title in t");
  if(!((x.rows||[]).length||(x.steps||[]).length||(x.asks||[]).length))bad(w,"empty idea: give it rows, steps or asks");
  rowsOk(x.rows,w,bad,true);(x.steps||[]).forEach(function(s){if(!String(s.s||"").trim())bad(w,"step needs s")});
  var a=x.asks||[];a.forEach(function(q){if(seen[q.id])bad(w,"repeated question id "+q.id);seen[q.id]=1});
  if(a.length)check({round:R.round,screens:a}).forEach(function(e){if(e.indexOf("round")!==0)bad(w,e)})});
 (R.screens||[]).forEach(function(q){if(q.kind!=="report")bad("screens","a grouped round keeps its questions inside ideas")});
 if(R._finish){var left=I.filter(function(x){return (x.steps||[]).length||(x.asks||[]).length}).map(function(x){return x.t||""});
  if(left.length)bad("finish","refused: steps or questions still open in: "+left.join("; ")+"")}
 var asks=I.some(function(x){return (x.asks||[]).length});
 if(R._after&&asks)bad("finish","after: refused while a question is still open; give the verdict once only the user's steps are left");
 if(!R._finish&&!R._after&&!asks&&!R._open)bad("ending","no ending: only the user's steps left = finish {kind, after:\"step N\", pickup}; Claude still has work = open: \"what Claude does next\"");return errs}
function txt4(m){if(m==null)return"";if(Array.isArray(m))return m.map(function(x){return typeof x==="string"?x:(x&&(x.p||x.c||x.s))||""}).filter(Boolean).join(" ");return String(m)}
var C5={navy:"#1e2533",ink:"#f2f4f8",sub:"#9aa3b5",dim:"#6f7a8f",yel:"#F5C518",red:"#F04A3E",pink:"#F6A5B8",mint:"#A8E6B0",gold:"#F5C518",blue:"#8EC5FF",ac:["#8EC5FF","#F2B880","#A8E6B0","#C9B8FF"]};
function rgba5(c,a){var n=parseInt(c.slice(1),16);return "rgba("+(n>>16)+","+(n>>8&255)+","+(n&255)+","+a+")"}
var CSS5=[
".q5{box-sizing:border-box;background:"+C5.navy+";color:"+C5.ink+";border-radius:14px;padding:16px 16px 0;font-family:ui-rounded,'SF Pro Rounded',var(--font-sans,system-ui,-apple-system,sans-serif);-webkit-text-size-adjust:100%;line-height:1.4}",
".q5 *{box-sizing:border-box}",
".q5 .tp{border-radius:14px;padding:6px 6px 8px 14px;margin:0 0 14px;background:"+rgba5(C5.mint,.05)+";box-shadow:0 0 0 1px "+rgba5(C5.mint,.35)+"}",
".q5 .il{font-size:13px;color:"+C5.dim+";letter-spacing:.03em;padding:10px 0 0;overflow-wrap:anywhere}",
".q5 .rw{display:flex;align-items:center;justify-content:space-between}",
".q5 .rt{flex:1;display:grid;grid-template-columns:30px minmax(0,1fr);min-width:0;align-items:center;padding:8px 0;cursor:pointer;font-size:17px;line-height:1.3;overflow-wrap:anywhere}",
".q5 .ar{display:inline-flex;align-items:center;justify-content:center;min-width:40px;min-height:40px;color:"+rgba5(C5.ink,.3)+";font-size:16px;cursor:pointer;transition:transform .15s}",
".q5 .dt{font-size:15px;line-height:1.5;color:"+C5.sub+";padding:0 0 8px 30px;overflow-wrap:anywhere}",
".q5 .dt ul{margin:0;padding-left:18px}.q5 .dt .sh{color:"+C5.ink+";margin-top:6px}",
".q5 .cp{display:flex;gap:8px;align-items:center;background:rgba(0,0,0,.18);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:8px 8px 8px 12px;margin:6px 0}",
".q5 .cp pre{flex:1;min-width:0;margin:0;font:13.5px/1.45 ui-monospace,Menlo,monospace;white-space:pre-wrap;overflow-wrap:anywhere;color:"+C5.ink+"}",
".q5 .bd{background:rgba(255,255,255,.07);border-radius:14px;padding:4px 14px 12px}",
".q5 .qi{border-radius:14px;padding:12px 14px 8px;margin:10px -6px 4px;background:"+rgba5(C5.blue,.05)+";box-shadow:0 0 0 1px "+rgba5(C5.blue,.22)+";transition:opacity .22s}",
".q5 .qi.gl{background:"+rgba5(C5.blue,.08)+";box-shadow:0 0 0 1px "+rgba5(C5.blue,.45)+",0 0 22px "+rgba5(C5.blue,.25)+"}",
".q5 .qt{font-size:19px;line-height:1.3;color:"+C5.ink+";padding:0 0 10px;overflow-wrap:anywhere;-webkit-hyphens:auto;hyphens:auto;text-wrap:pretty}",
".q5 .qr{font-size:15px;color:"+C5.sub+";line-height:1.5;padding:0 0 10px}",
".q5 .ch{display:flex;flex-wrap:wrap;gap:12px;padding:0 0 6px}.q5 .ch.col{flex-direction:column;gap:10px}",
".q5 .mo{font-size:14px;opacity:.75;margin-top:2px;line-height:1.35}",
".q5 .more{font-size:15px;color:"+C5.dim+";padding:6px 0 0}",
".q5 .ends{display:flex;justify-content:space-between;font-size:14px;color:"+C5.dim+";padding:0 0 6px}",
".q5 .pi{font-size:16px;color:"+C5.sub+";padding:2px 0 8px}",
".q5 .sr{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:12px 0 0}",
".q5 .fin{margin:0 0 14px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.07)}",
".q5 .thumbs{display:flex;gap:8px;flex-wrap:wrap}.q5 .thumbs:not(:empty){margin-top:8px}.q5 .th{position:relative;width:56px;height:56px}.q5 .th img{width:56px;height:56px;object-fit:cover;border-radius:6px}",
".q5.drop{outline:2px dashed "+C5.blue+";outline-offset:4px}",
".q5 .rt>span:last-child{min-width:0;-webkit-hyphens:auto;hyphens:auto;text-wrap:pretty;line-height:1.3}",
".q5 .rt.t2{font-size:15px}.q5 .qt.t2{font-size:17px}",
".q5 .rt.cl>span:last-child{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}",
".q5 [data-item].open .rt.cl>span:last-child{display:block;-webkit-line-clamp:unset}",
".q5 .sm{font-size:15px;line-height:1.45;color:#9aa3b5;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;overflow-wrap:anywhere;padding:8px 0}",
".q5 .dn{padding:4px 0 8px}",
".q5 .stash{position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none}"].join("\n");
var TB5="display:inline-flex;align-items:center;box-sizing:border-box;cursor:pointer;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;touch-action:manipulation;";
function esc5(t){return String(t==null?"":t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function rich5(t){return esc5(t).split("**").map(function(p,i){return i%2?"<b>"+p+"</b>":p}).join("")}
function stamp(R){var o=[];(function w(v,top){if(v===null||v===undefined)o.push("~");else if(typeof v==="boolean")o.push(v?"T":"F");else if(Array.isArray(v)){o.push("[");v.forEach(function(x){w(x)});o.push("]")}else if(typeof v==="object"){Object.keys(v).sort().forEach(function(k){if(top&&k==="_ok")return;o.push("{"+k);w(v[k])});o.push("}")}else if(typeof v==="string")o.push('"'+v);else if(typeof v==="number")o.push("#"+String(v));else o.push("~")})(R,true);
 var s=o.join(""),h=0x811c9dc5;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return("0000000"+h.toString(16)).slice(-8)}
var DONE_ORD=["❌","⚠","🔍","🛑","📌","🗂","❝","✅","🧠"],KEEP_ORD=["❌","⚠","✅","🧠"];
function emo0(s){s=String(s||"");var e=first(s);if(!e&&/^❝\s+\S/.test(s))e="❝";return e.replace(/️/g,"")}
function wsp(s){return String(s==null?"":s).split(/\s+/).filter(Boolean).join(" ")}
function keepRow(r){if(!r||typeof r!=="object")return false;var e=emo0(r.s);if(e==="💬"||e==="✉")return true;if(e==="✅"||e==="🧠")return false;return Array.isArray(r.m)&&r.m.some(function(x){return x&&typeof x==="object"&&x.c!=null})}
function kr(o){var i=KEEP_ORD.indexOf(emo0(o.r.s));return i<0?3:i}
function dr(o){var i=DONE_ORD.indexOf(emo0(o.r.s));return i<0?DONE_ORD.length:i}
function fold(R){var keep=[],done=[];(R.ideas||[]).forEach(function(I,k){var kept=[];(I.rows||[]).forEach(function(r,i){if(!r||typeof r!=="object")return;var o={id:k+"_"+i,r:r};if(keepRow(r))kept.push(o);else done.push({k:k,i:i,id:o.id,r:r})});
 kept=kept.map(function(o,j){return{o:o,j:j}}).sort(function(a,b){return kr(a.o)-kr(b.o)||a.j-b.j}).map(function(x){return x.o});if(kept.length)keep.push({k:k,rows:kept})});
 done.sort(function(a,b){return dr(a)-dr(b)||a.k-b.k||a.i-b.i});return{keep:keep,done:done}}
function sumParts(done){var parts=[],n=0,at=-1;(done||[]).forEach(function(o){var s=String(o.r.s||"");if(emo0(s)==="🧠"){n++;if(at<0){at=parts.length;parts.push("")}return}var m=null;try{m=EMO.exec(s)}catch(x){}parts.push(m?m[1]+" "+wsp(m[2]):wsp(s))});if(at>=0)parts[at]="🧠 Claude saved "+n+" rule"+(n===1?"":"s");return parts}
function summary(done){return sumParts(done).join(" · ")}
var SCH={round:{round:0,t:0,title:0,line:0,rows:["row"],steps:["step"],asks:["ask"],ideas:["idea"],screens:["ask"],mem:["mem"],finish:"finish",open:0,shots:0,root:0,theme:0,file:0,_ok:0},
 idea:{t:0,line:0,rows:["row"],steps:["step"],asks:["ask"],mem:["mem"]},
 row:{s:0,m:["row"],p:0,c:0,id:0,draft:0},step:{id:0,s:0,m:["row"]},
 ask:{id:0,kind:0,q:0,options:["option"],multi:["option"],max:0,min:0,pick:["any"],rows:["row"],note:0,sug:0,sugStyle:0,text:0,ph:0,code:0,action:0,more:0,wait:0,items:["item"],ends:["any"],step:0,unit:0,quick:["any"]},
 option:{label:0,pick:0,more:0},item:{id:0,text:0,a:0,b:0,pick:0},finish:{kind:0,pickup:0,why:0,after:0},mem:{file:0,line:0,was:0,sha:0},any:{}};
var ARRK={rows:1,steps:1,asks:1,ideas:1,screens:1,mem:1,options:1,multi:1,items:1,ends:1,quick:1},ALLK={},HEAD={ask:"q",row:"s",step:"s",option:"label",idea:"t"};Object.keys(SCH).forEach(function(t){Object.keys(SCH[t]).forEach(function(k){ALLK[k]=1})});
function has(t,k){return !!SCH[t]&&Object.prototype.hasOwnProperty.call(SCH[t],k)}
function readJson(src){
 var out={v:undefined,rep:0,cut:false,stray:[]};
 try{out.v=JSON.parse(src);return out}catch(e){}
 var i=0,n=src.length,st=[],root,hasRoot=false,strayV=[],guard=0;
 function fix(){out.rep++}
 function top(){return st[st.length-1]}
 function ws(j){while(j<n&&(src.charCodeAt(j)<=32||src[j]==="\uFEFF"||src[j]==="\u00a0"))j++;return j}
 function keyAt(j){j=ws(j);var c=src[j],m,b;if(c==='"'||c==="'"){var e=j+1;while(e<n&&e-j<48&&src[e]!==c&&src[e]!=="\n")e++;var a=ws(e+1);if(src[e]===c&&src[a]===":")return{key:src.slice(j+1,e),end:a+1,bare:false};
   m=/^([A-Za-z_$][\w$]*)\s*:/.exec(src.slice(j+1,j+48));return m&&ALLK[m[1]]?{key:m[1],end:j+1+m[0].length,bare:true}:null}
  m=/^[A-Za-z_$][\w$]*/.exec(src.slice(j,j+48));if(m){b=ws(j+m[0].length);if(src[b]===":")return{key:m[0],end:b+1,bare:true};
   if((src[b]==='"'||src[b]==="'")&&ALLK[m[0]]&&src[ws(b+1)]===":")return{key:m[0],end:ws(b+1)+1,bare:true}}return null}
 function vstart(c){return c==='"'||c==="'"||c==="{"||c==="["||c==="-"||(c>="0"&&c<="9")}
 function lit(j){var m=/^(true|false|null)(?![\w$])/.exec(src.slice(j,j+6));return m?m[1]:null}
 function endOk(j,f){j=ws(j);if(j>=n||!f)return true;var c=src[j],p,k;if(c==="}"||c==="]")return true;
  if(f.k==="obj"){if(c===","){p=ws(j+1);if(p>=n||src[p]==="}"||src[p]==="{"||src[p]==="[")return true;k=keyAt(p);return !!(k&&(!k.bare||ALLK[k.key]))}
   k=keyAt(j);return !!(k&&!k.bare&&has(f.t,k.key))}
  if(c===","){p=ws(j+1);return p>=n||src[p]==="]"||vstart(src[p])||!!lit(p)}
  return c==='"'||c==="'"||c==="{"}
 function rstr(f){var q=src[i],o="",dm=false,ts=-1,tl=0,mp={n:"\n",t:"\t",r:"\r",b:"\b",f:"\f"};i++;
  for(;;){if(i>=n){out.cut=true;dm=true;break}
   var c=src[i];
   if(c==="\\"&&i+1<n){var x=src[i+1];
    if(x==="u"&&/^[0-9a-fA-F]{4}$/.test(src.substr(i+2,4))){o+=String.fromCharCode(parseInt(src.substr(i+2,4),16));i+=6}
    else if(mp[x]){o+=mp[x];i+=2}else if(x==='"'||x==="'"||x==="\\"||x==="/"||x==="\n"){o+=x;i+=2}else{o+=c;i++;fix();dm=true}
    ts=-1;continue}
   if(c===q){if(endOk(i+1,f)){i++;break}
    var k=keyAt(i);
    if(k&&f&&f.k==="obj"&&has(f.t,k.key)&&ts>=0&&/[,}\]]/.test(src.slice(ts,i))){o=o.slice(0,tl);i=ts;dm=true;fix();break}
    dm=true;fix();o+=c;i++;ts=-1;continue}
   if(c===","||c==="}"||c==="]"||c==="{"||c==="["||c<=" "){if(ts<0){ts=i;tl=o.length}}else ts=-1;
   o+=c;i++}
  return{v:o,d:dm}}
 function safeKey(k){return k==="__proto__"||k==="constructor"||k==="prototype"?"_"+k:k}
 function open(kind,t){var f={k:kind,t:t,v:kind==="obj"?{}:[],s:0,key:null,last:null,wrap:null},p=top();
  if(!p){if(!hasRoot){hasRoot=true;root=f.v}else strayV.push(f.v)}
  else if(p.k==="arr"){if(p.s===2)fix();p.v.push(f.v);p.s=2}else{p.v[p.key]=f.v;p.last=p.key;p.key=null;p.s=2}
  st.push(f);return f}
 function put(val,dm){var p=top();if(!p){if(!hasRoot){hasRoot=true;root=val}return}
  if(p.k==="arr"){if(p.s===2)fix();p.v.push(val);p.s=2}else{p.v[p.key]=val;if(dm&&p.key==="c")p.v._dmg=true;p.last=p.key;p.key=null;p.s=2}}
 function sniff(p,t){if(src[p]!=="{")return 1;var k=keyAt(p+1);if(!k||!t||t==="any")return 1;if(has(t,k.key))return 2;return ALLK[k.key]?0:1}
 function fits(d,j){j=ws(j);if(j>=n)return 1;var c=src[j],f,p,k;
  if(!d)return /^[\s)\];}]*$/.test(src.slice(j))?1:0;
  f=st[d-1];
  if(f.k==="arr"){if(c==="]")return 1;if(c==="}")return .5;
   if(c===","){p=ws(j+1);if(p>=n||src[p]==="]")return 1;if(src[p]==="{")return sniff(p,f.t);if(keyAt(p))return 0;return vstart(src[p])||lit(p)?1:.25}
   if(c==="{")return Math.max(0,sniff(j,f.t)-.5);return 0}
  if(c==="}")return 1;if(c==="]")return .5;
  if(c===","){p=ws(j+1);if(p>=n||src[p]==="}")return 1;k=keyAt(p);if(k)return has(f.t,k.key)?2:(f.t==="any"?1:.5);return src[p]==="{"||src[p]==="["?.25:0}
  k=keyAt(j);return k?(has(f.t,k.key)?1.5:.5):0}
 function closer(c){var d=st.length,want=c==="}"?"obj":"arr",m=-1,j,best=0,score,s;
  for(j=d-2;j>=0;j--)if(st[j].k===want){m=j;break}
  score=fits(d,i+1)-.1;s=fits(d-1,i+1)-.05;if(s>score){score=s;best=1}
  if(m>=0){s=fits(m,i+1);if(s>=score){score=s;best=d-m}}
  fix();i++;while(best-->0)st.pop()}
 function strayOpen(f){var j,pick=-1,s;
  if(f.wrap&&src[i]==="{"){var a=[f.v[f.wrap.key]];f.v[f.wrap.key]=a;st.push({k:"arr",t:f.wrap.t,v:a,s:0,key:null,last:null,wrap:null});f.wrap=null;fix();return}
  for(j=st.length-2;j>=0;j--)if(st[j].k==="arr"){s=sniff(i,st[j].t);if(s===2){pick=j;break}if(s===1&&pick<0)pick=j}
  fix();if(pick>=0){st.length=pick+1;return}
  if(src[i]==="{"){var ks=Object.keys(SCH[f.t]||{}).filter(function(k){var d=SCH[f.t][k];return Array.isArray(d)&&Array.isArray(f.v[k])&&sniff(i,d[0])===2});
   if(ks.length){var kk=ks.indexOf(f.last)>=0?f.last:ks[ks.length-1];st.push({k:"arr",t:SCH[f.t][kk][0],v:f.v[kk],s:0,key:null,last:null,wrap:null});return}}
  var g={k:src[i]==="{"?"obj":"arr",t:"any",v:src[i]==="{"?{}:[],s:0,key:null,last:null,wrap:null};strayV.push(g.v);st.push(g);i++}
 function scalar(){var m=/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?(?![\w.])/.exec(src.slice(i,i+40)),l;
  if(m){i+=m[0].length;return put(Number(m[0]))}
  if((l=lit(i))){i+=l.length;return put(l==="true"?true:l==="false"?false:null)}
  var e=src.indexOf('"',i),s;if(e>i&&endOk(e+1,top())){s=src.slice(i,e);i=e+1;fix();return put(s,true)}
  e=i;while(e<n&&",}]\n".indexOf(src[e])<0)e++;if(e===i)e=i+1;s=src.slice(i,e).trim();
  if(s.slice(-1)==='"'||s.slice(-1)==="'")s=s.slice(0,-1);
  i=e;fix();put(s===""?null:s,true)}
 function junk(f){var e=i;while(e<n&&",}]\"'{[".indexOf(src[e])<0)e++;if(e===i)e=i+1;var s=src.slice(i,e).trim();if(s.length>2)out.stray.push(s);if(f&&f.last==="c")f.v._dmg=true;i=e;fix()}
 function readKey(f){var c=src[i],k=keyAt(i);
  if(k){if(k.bare||c==="'"||k.key.indexOf("\\")>=0)fix();i=k.end;return k.key}
  if(c==='"'||c==="'"){var e=i+1;while(e<n&&src[e]!==c&&src[e]!=="\n")e++;var s=src.slice(i+1,e),a=ws(e+1);
   if(src[e]===c&&a<n&&vstart(src[a])&&s.length<32&&(has(f.t,s)||f.t==="any")){i=e+1;fix();return s}
   if(s.trim().length>2)out.stray.push(s);if(f.last==="c")f.v._dmg=true;i=Math.min(n,e+1);fix();return null}
  junk(f);return null}
 for(;;){
  if(++guard>n*6+2000){fix();break}
  i=ws(i);if(i>=n)break;
  var f=top(),c=src[i],k,d,r,t;
  if(!f){
   if(!hasRoot){if(c==="{"){i++;open("obj","round");continue}if(c==="["){i++;open("arr",null);continue}}
   if(c===")"||c===";"){i++;continue}
   if(c==="}"||c==="]"){i++;fix();continue}
   out.stray.push(src.slice(i,i+600));fix();break}
  if(f.k==="arr"){
   if(c==="]"){i++;st.pop();continue}
   if(c===","){if(f.s!==2)fix();i++;f.s=0;continue}
   if(c==="}"){closer(c);continue}
   if((k=keyAt(i))&&(!k.bare||ALLK[k.key])){var pf=st.length>1?st[st.length-2]:null,sa=has(f.t,k.key)?(HEAD[f.t]===k.key?2:1)-(f.v.some(function(x){return !x||typeof x!=="object"})?1:0):0,sb=pf?(has(pf.t,k.key)?2:(pf.t==="any"?1:.5)):-1;
    if(sa>sb&&sa>0){fix();open("obj",f.t);continue}
    if(pf){st.pop();fix();continue}}
   if(c==="{"&&f.t&&sniff(i,f.t)===0){var up=-1,z;for(z=st.length-2;z>=0;z--)if(st[z].k==="arr"&&sniff(i,st[z].t)===2){up=z;break}if(up>=0){st.length=up+1;fix();continue}}
   if(c==="{"){i++;t=f.t;if(t==null){k=keyAt(i);t=f.t=!k?"any":(HEAD.ask===k.key||/^(kind|options|multi|code|action|text|ends|items)$/.test(k.key))?"ask":has("idea",k.key)?"idea":has("row",k.key)?"row":"any"}open("obj",t);continue}
   if(c==="["){i++;open("arr","any");continue}
   if(c==='"'||c==="'"){if(c==="'")fix();r=rstr(f);put(r.v,r.d);continue}
   scalar();continue}
  if(f.s===1){
   if(c==="{"){i++;d=SCH[f.t]&&SCH[f.t][f.key];t=f.key;if(Array.isArray(d)){open("obj",d[0]);f.wrap={key:t,t:d[0]}}else open("obj",typeof d==="string"?d:"any");continue}
   if(c==="["){i++;d=SCH[f.t]&&SCH[f.t][f.key];open("arr",Array.isArray(d)?d[0]:"any");continue}
   if((c==='"'||c==="'")&&ARRK[f.key]&&has(f.t,f.key)){d=SCH[f.t][f.key];fix();open("arr",Array.isArray(d)?d[0]:"any");continue}
   if(c==='"'||c==="'"){if(c==="'")fix();r=rstr(f);put(r.v,r.d);continue}
   if(c===","||c==="}"||c==="]"){fix();put(null);continue}
   scalar();continue}
  if(c==="}"){if(st.length===1&&!/^[\s)\];}\]]*$/.test(src.slice(i+1))){i++;fix();continue}i++;st.pop();continue}
  if(c===","){if(f.s!==2)fix();i++;f.s=0;continue}
  if(c==="]"){closer(c);continue}
  if(c==="{"||c==="["){strayOpen(f);continue}
  k=readKey(f);
  if(k!=null){if(f.s===2)fix();f.wrap=null;k=safeKey(k);
   if(HEAD[f.t]===k&&Object.prototype.hasOwnProperty.call(f.v,k)&&st.length>1&&st[st.length-2].k==="arr"){st.pop();fix();f=open("obj",f.t)}
   f.key=k;f.s=1}}
 if(st.length){out.cut=true;st.forEach(function(f){if(f.k==="obj")f.v._cut=true})}if(out.cut)fix();
 strayV.forEach(function(v){try{var s=JSON.stringify(v);if(s&&s.length>4)out.stray.push(s)}catch(e){}});
 out.v=root;return out}
var FENCE=/^\x60{3}/,FENCE1=/^\x60{3}.+\x60{3}$/;
function oneLine(s){return FENCE1.test(s)&&s.length>6}
function isRowLine(s){var m=null;try{m=EMO.exec(s)}catch(x){}return !!(m&&/[\p{Extended_Pictographic}⃣]/u.test(m[1]))||/^❝\s+\S/.test(s)}
function readLines(src,whole){
 var L=String(src).replace(/\r\n?/g,"\n").split("\n"),rep={},R={round:null,ideas:[]},I=null,cur=null,fl=[],odd,voidFrom=-1,j,seen=false;
 function fix(k){rep[k]=(rep[k]||0)+1}
 function idea(){if(!I){I={rows:[],steps:[],asks:[]};R.ideas.push(I)}return I}
 function isBreak(t){return /^(\?\?|\?_|\?)\s+\S/.test(t)||/^\uD83D\uDD10/.test(t)||/^#\s+\S/.test(t)}
 L.forEach(function(s,x){var t=s.trim();if(FENCE.test(t)&&!oneLine(t))fl.push(x)});odd=fl.length%2===1;if(odd)voidFrom=fl[0];
 function plainRow(s){idea().rows.push({s:s})}
 function detail(s){
  if(cur&&cur.t==="opt"){endAsk();fix("line")}
  if(!cur)return plainRow(s);
  if(cur.t==="ask"){(cur.o.rows=cur.o.rows||[]).push({p:s});return}
  var o=cur.o;if(o.m==null)o.m=[];o.m.push({p:s})}
 function copy(text,dm){var b={c:text};if(dm)b._dmg=true;
  if(cur&&cur.t==="opt"){endAsk();fix("line")}
  if(!cur){idea().rows.push({s:"Text to copy",m:[b]});return}
  if(cur.t==="ask"){(cur.o.rows=cur.o.rows||[]).push({p:"",m:[b]});return}
  if(cur.o.m==null)cur.o.m=[];cur.o.m.push(b)}
 function endAsk(){var c=cur;cur=null;if(!c||(c.t!=="ask"&&c.t!=="opt"))return;var a=c.o;
  if(a._want&&!(a.options||[]).length){var k=I.asks.indexOf(a);if(k>=0)I.asks.splice(k,1);cur=a._pre||null;fix("line");detail(a._ln);(a.rows||[]).forEach(function(r){if(r.m)copy(r.m[0].c,r.m[0]._dmg);else detail(r.p)});cur=null}
  delete a._want;delete a._pre;delete a._ln;delete a._said}
 function place(o,t){var was=cur&&cur.t==="opt";endAsk();cur={t:t,o:o,after:was}}
 for(j=0;j<L.length;j++){
  var raw=L[j],s=raw.trim(),m;
  if(FENCE.test(s)&&!oneLine(s)){
   var body=[],closed=false,k=j+1,head=s.slice(3).trim(),ind=/^\s*/.exec(raw)[0];if(head&&!/^[\w-]+$/.test(head))body.push(head);
   for(;k<L.length;k++){var t=L[k].trim();if(FENCE.test(t)&&!oneLine(t)){closed=true;break}if(odd&&isBreak(t))break;body.push(ind&&L[k].indexOf(ind)===0?L[k].slice(ind.length):L[k])}
   while(body.length&&!body[0].trim())body.shift();while(body.length&&!body[body.length-1].trim())body.pop();
   if(!closed)fix("fence");
   if(body.join("").trim())copy(body.join("\n"),odd);
   if(closed){var rest=L[k].trim().slice(3).trim();if(rest){fix("line");if(/^\uD83D\uDD10/.test(rest)){endAsk();idea().asks.push({kind:"code",_fault:"an approval must start its own line",action:rest});j=k}else{L[k]=rest;j=k-1}}else j=k}else j=k-1;
   continue}
  if(!s)continue;
  if(!seen){seen=true;if(/^[a-z]{2,8}\d{1,4}$/.test(s)){R.round=s;continue}}
  if(oneLine(s)){copy(s.slice(3,-3).trim(),false);continue}
  if(/^#\s+\S/.test(s)){endAsk();I={t:s.replace(/^#\s+/,""),rows:[],steps:[],asks:[]};R.ideas.push(I);cur=null;continue}
  if(/^\uD83D\uDD10/.test(s)){var a={kind:"code"},cm=/^\uD83D\uDD10 +(\d{4}) +(\S[\s\S]*)$/.exec(s),lm=/^\uD83D\uDD10\s*(\S*)\s*([\s\S]*)$/.exec(s);
   if(voidFrom>=0&&j>voidFrom){a._fault="a copy box above it was never closed";a.action=lm[2]||s}
   else if(!whole&&j===L.length-1){a._fault="the last line may be cut off";a.action=lm[2]||s}
   else if(cm){a.code=cm[1];a.action=cm[2]}
   else{a._fault=/^\d{4}$/.test(lm[1])?"needs its exact action after the code":"code must be exactly 4 digits, then the action";a.action=(/^\d+$/.test(lm[1])?lm[2]:(lm[1]+" "+lm[2])).trim()||s}
   endAsk();idea().asks.push(a);cur={t:"ask",o:a};continue}
  if((m=/^(\?\?|\?_|\?)\s+(\S[\s\S]*)$/.exec(s))){var pre=cur&&cur.t!=="opt"&&cur.t!=="ask"?cur:null;endAsk();var q={q:m[2]};
   if(m[1]==="?_")q.kind="text";else{q.options=[];if(m[1]==="??")q.multi=true;q._want=true;q._pre=pre;q._ln=s}
   idea().asks.push(q);cur={t:"ask",o:q};continue}
  if((m=/^\[\s?\]\s+(\S[\s\S]*)$/.exec(s))){var stp={s:m[1]};idea().steps.push(stp);place(stp,"step");continue}
  if((m=/^([*-])\s+(\S[\s\S]*)$/.exec(s))&&cur&&(cur.t==="opt"||(cur.t==="ask"&&cur.o._want&&!(cur.o.rows||[]).some(function(r){return r.m})))){
   var parts=m[2].split(" | "),op={label:parts[0].trim()};if(parts.length>1&&parts.slice(1).join(" | ").trim())op.more=parts.slice(1).join(" | ").trim();if(m[1]==="*")op.pick=true;
   cur.o.options.push(op);cur={t:"opt",o:cur.o};continue}
  if((m=/^=\s+(delete|keep)\s*:?\s*([\s\S]*)$/i.exec(s))){endAsk();R.finish=m[1].toLowerCase()==="delete"?{kind:"delete",pickup:m[2]}:{kind:"keep",why:m[2]};continue}
  if(/^!\s*\d{3,5}(\s|$)/.test(s)){endAsk();idea().asks.push({kind:"code",_fault:"a line starting with ! is never an approval",action:s.replace(/^!\s*\d+\s*/,"")||s});continue}
  if(isRowLine(s)){var rw={s:s};idea().rows.push(rw);place(rw,"row");continue}
  if(/^[*-]\s/.test(s)&&(!cur||cur.after||s[0]==="*")){if(cur)cur.after=false;fix("line")}
  else if(cur&&cur.t==="ask"&&cur.o._want&&!cur.o.options.length&&!cur.o._said){cur.o._said=true;fix("line")}
  detail(s)}
 endAsk();
 if(R.round==null)R.round="";
 if(!R.finish)R.open="Claude continues";
 return{R:R,rep:rep}}
function readText(t,whole){
 t=String(t==null?"":t).replace(/^\uFEFF/,"");var s=t.replace(/^\s+/,""),k=s.indexOf("QP.mount(");
 if(k>=0&&!/^[{\[]/.test(s)&&/^[\s\S]{0,400}$/.test(s.slice(0,k)))s=s.slice(k+9).replace(/^\s+/,"");
 var fm=/^\x60{3}[\w-]*\s*(?=[{\[])/.exec(s);if(fm)s=s.slice(fm[0].length).replace(/\x60{3}\s*$/,"");
 if(!s.trim())return{fail:"the page text is empty"};var lost=/^["']?(round|ideas|rows|steps|asks|screens)["']?\s*:/.test(s);if(lost)s="{"+s;
 if(s[0]==="{"||s[0]==="["){var j=readJson(s),rep={};if(lost)j.rep++;if(j.rep)rep.syntax=j.rep;
  if(j.v==null||typeof j.v!=="object")return{fail:"the page text could not be read as a round"};
  return{R:j.v,rep:rep,stray:j.stray,voided:j.rep?"the page text had to be repaired":null}}
 var l=readLines(s,whole);return{R:l.R,rep:l.rep,stray:[],voided:null}}
var QK=["decide","do","pair","rank","drag","scale","date","number","text","check"];
function plan(input,cut,whole){
 var REP={},ND=[],BAD=[],VOID=null,LOOSE=false,SHAKY=!!cut,R0=input;if(cut){REP.syntax=1;VOID="the page text was cut by a script end tag"}
 function fix(k){REP[k]=(REP[k]||0)+1}
 function rawT(v){var s;try{s=typeof v==="string"?v:JSON.stringify(v)}catch(e){s=String(v)}return String(s==null?"":s).slice(0,300)}
 function nd(v,why){ND.push({text:rawT(v),why:why||""})}
 function arr(v){return v==null?[]:(Array.isArray(v)?v:[v])}
 function sid(v){return String(v).replace(/[^\w.-]/g,"_")}
 function own(o,k){return Object.prototype.hasOwnProperty.call(o,k)}
 function alias(o,k,list){if(o[k]!=null)return;for(var i=0;i<list.length;i++)if(o[list[i]]!=null&&typeof o[list[i]]!=="object"){o[k]=o[list[i]];delete o[list[i]];fix("key");return}}
 function deepEm(v,skip){
  if(typeof v==="string"){if(v.indexOf("—")<0)return v;fix("em");return v.replace(/\s*—\s*/g,", ")}
  if(Array.isArray(v)){for(var i=0;i<v.length;i++)v[i]=deepEm(v[i]);return v}
  if(v&&typeof v==="object"){if(v.kind==="code"&&!skip)return v;Object.keys(v).forEach(function(k){if(k==="c"||k==="id"||k==="code"||k==="_nd"||k==="_bad")return;v[k]=deepEm(v[k])})}
  return v}
 function names(o,k,list){if(o[k]!=null)return false;for(var i=0;i<list.length;i++)if(o[list[i]]!=null&&typeof o[list[i]]==="object"){o[k]=o[list[i]];delete o[list[i]];fix("key");return true}return false}
 function lone(o){return o.rows==null&&o.steps==null&&o.asks==null&&o.ideas==null&&o.mem==null&&!(Array.isArray(o.screens)&&o.screens.length)&&((typeof o.q==="string"&&o.q.trim())||own(o,"action")||own(o,"code")||Array.isArray(o.options)||Array.isArray(o.multi))}
 function nRow(x,inM){
  if(x==null){fix("row");return null}
  if(typeof x==="string"||typeof x==="number"||typeof x==="boolean"){x=String(x);if(!x.trim()){fix("row");return null}return inM?{p:x}:{s:x}}
  if(typeof x!=="object")return{_nd:rawT(x)};
  if(Array.isArray(x))return{_list:nRows(x,inM)};
  var s=x.s,c=x.c,p=x.p,m=x.m,o={},d=[];
  if(s==null&&typeof x.t==="string"){s=x.t;fix("key")}else if(s==null&&typeof x.title==="string"){s=x.title;fix("key")}
  if(c==null&&x.copy!=null){c=x.copy;fix("key")}
  if(c!=null&&typeof c==="object")c=typeof c.text==="string"?c.text:rawT(c);
  if(s!=null&&!String(s).trim())s=null;
  if(s==null&&c==null&&p==null&&m==null)return{_nd:rawT(x)};
  if(s==null&&!inM){fix("row");if(p!=null&&String(p).trim()){s=String(p);p=null}else s=c!=null?"Text to copy":"Details"}
  if(s==null){var l=[];if(p!=null&&String(p).trim())l.push({p:String(p)});if(m!=null)l=l.concat(nRows(m,true));if(c!=null){o.c=String(c);if(x._dmg)o._dmg=true;l.push(o)}return l.length===1?l[0]:{_list:l}}
  o.s=String(s);if(x.id!=null)o.id=sid(x.id);
  if(typeof m==="string"||typeof m==="number"){if(String(m).trim()){if(p==null&&c==null)o.m=String(m);else d.push({p:String(m)})}}
  else if(m!=null)d=nRows(m,true);
  if(p!=null&&String(p).trim())d.push({p:String(p)});
  if(c!=null){var b={c:String(c)};if(x._dmg)b._dmg=true;d.push(b)}
  if(d.length)o.m=d;return o}
 function nRows(rows,inM){var out=[];arr(rows).forEach(function(x){var r;try{r=nRow(x,inM)}catch(e){r={_nd:rawT(x)}}
  if(!r)return;if(r._list){out=out.concat(r._list);return}
  if(r._nd!=null){if(inM)out.push({p:r._nd});else nd(r._nd,"row");return}out.push(r)});return out}
 function nStep(x){
  if(x==null){fix("step");return null}
  if(typeof x==="string"||typeof x==="number"){x=String(x);if(!x.trim()){fix("step");return null}return{s:x}}
  if(typeof x!=="object"||Array.isArray(x))return{_nd:rawT(x)};
  if(![x.s,x.t,x.title,x.p].some(function(v){return (typeof v==="string"||typeof v==="number")&&String(v).trim()}))return{_nd:rawT(x)};
  var r=nRow(x,false);if(!r||r._nd!=null||r._list)return{_nd:rawT(x)};return r}
 function optLabel(o){if(o==null)return null;if(typeof o==="object"){var l=o.label;if(l==null)l=o.l!=null?o.l:(o.text!=null?o.text:(o.t!=null?o.t:(o.s!=null?o.s:o.title)));return l==null||typeof l==="object"?null:String(l)}return String(o)}
 function distinct(list,get,set){var seen={};list.forEach(function(o){var l=get(o),b=l,n=1;while(own(seen,l)){n++;l=b+" ("+n+")"}if(n>1){set(o,l);fix("label")}seen[l]=1})}
 function codeLine(s){var m=/^\s*\uD83D\uDD10 +(\d{4}) +(\S[\s\S]*)$/.exec(s);return m?{kind:"code",code:m[1],action:m[2]}:{kind:"code",_fault:"code must be exactly 4 digits, then the action",action:s.replace(/^\s*\uD83D\uDD10\s*/,"")}}
 function nCode(q){
  var title=typeof q.q==="string"&&q.q.trim()?q.q:null,label=title||(typeof q.action==="string"&&q.action.trim()?q.action:"")||"approval",c=q.code,o,e;
  function bad(why){return{_bad:why,label:String(label).slice(0,200)}}
  if(q._fault)return bad(q._fault);
  if(VOID)return bad(VOID);
  if(LOOSE)return bad("it was not inside asks");
  if(q.kind!=null&&!(typeof q.kind==="string"&&q.kind.toLowerCase().trim()==="code")&&!(c===true&&q.kind==="decide"))return bad("its kind must be code");
  if(c===true&&q.kind==="decide"&&Array.isArray(q.options)){var o0=q.options[0]||{},o1=q.options[1]||{},pm=/^\uD83D\uDD10 Approve (\d{4}): ([\s\S]*)$/.exec(String(o1.label||""));
   if(q.options.length!==2||!pm||String(o0.label||"").toLowerCase().indexOf("not yet")<0||o0.pick||o1.pick)return bad("code screen is not Not yet then Approve");
   q=Object.assign({},q,{kind:"code",code:pm[1],action:pm[2],more:o1.more,wait:o0.more});delete q.options;c=q.code}
  if(typeof c==="number"&&isFinite(c))c=String(c);
  if(typeof c!=="string"||!/^\d{4}$/.test(c))return bad("code must be exactly 4 digits");
  if(typeof q.action!=="string"||!q.action.trim()||q.action.trim()==="undefined")return bad("needs its exact action");
  if(q.pick!=null&&q.pick!==false)return bad("takes no pick");
  if(q.sug!=null)return bad("takes no sug");
  if((Array.isArray(q.options)&&q.options.length)||(Array.isArray(q.multi)&&q.multi.length)||q.multi===true)return bad("takes no options");
  if((q.more!=null&&typeof q.more!=="string")||(q.wait!=null&&typeof q.wait!=="string"))return bad("more and wait must be text");
  if(q.q!=null&&typeof q.q!=="string")return bad("q must be text");
  o={kind:"code",q:title||"Approve this?",action:q.action,code:c};if(q.id!=null)o.id=sid(q.id);if(q.more!=null)o.more=q.more;if(q.wait!=null)o.wait=q.wait;if(q.note===true)o.note=true;
  if(q.rows!=null)o.rows=askRows(q.rows);
  e=check({round:"iqp1",screens:[prepQ(Object.assign({id:"x"},o))]});
  if(e.length)return bad(e[0].replace(/^screen 1: /,""));
  return o}
 function askRows(rows){return nRows(rows,true).map(function(r){return r.c!=null?{p:"",m:[r]}:r})}
 function pickSet(q,opts,get){var set=[],miss=false;
  function add(v){var i=-1;
   if(typeof v==="number"&&v%1===0)i=v-1;
   else if(typeof v==="string"){var t=v.trim().toLowerCase();opts.forEach(function(o,j){if(i<0&&String(get(o)).trim().toLowerCase()===t)i=j});if(i<0&&/^\d+$/.test(t))i=parseInt(t,10)-1}
   else if(v===true||v===false||v==null)return;
   if(i<0||i>=opts.length){miss=true;return}if(set.indexOf(i)<0)set.push(i)}
  arr(q.pick).forEach(add);set.sort(function(a,b){return a-b});set.miss=miss;return set}
 function nAsk(q){
  if(q==null){fix("ask");return null}
  if(typeof q==="string"){if(!q.trim()){fix("ask");return null}if(/^\s*\uD83D\uDD10/.test(q))return nCode(codeLine(q));fix("ask");return{kind:"text",q:q}}
  if(typeof q!=="object"||Array.isArray(q))return{_nd:rawT(q),why:"not a question"};
  var src=q;q=Object.assign({},q);
  if(q._cut){delete q._cut;if(q.kind==="code"||own(q,"code")||own(q,"action"))return{_bad:"cut off",label:String(typeof q.q==="string"?q.q:(typeof q.action==="string"?q.action:"approval")).slice(0,200)};var cs=Object.assign({},src);delete cs._cut;return{_nd:rawT(cs),why:"cut off"}}
  alias(q,"q",["question","title","t","ask"]);if(q.options==null&&!Array.isArray(q.multi)){if(Array.isArray(q.opts)){q.options=q.opts;delete q.opts;fix("key")}else if(Array.isArray(q.choices)){q.options=q.choices;delete q.choices;fix("key")}}
  var k=typeof q.kind==="string"?q.kind.toLowerCase().trim():q.kind;
  if(k==="code"||own(q,"code")||own(q,"action")||q._fault!=null)return nCode(q);
  if(arr(q.options).concat(arr(q.multi),arr(q.items),arr(q.opts),arr(q.choices)).some(function(o){var l=optLabel(o)||"";return /^\s*\uD83D\uDD10/.test(l)||/\bApprove\s+\d{4}\b/i.test(l)||/\uD83D\uDD10\s*Approve/i.test(l)}))return{_bad:"an approval must be a code ask with its code and action",label:String(typeof q.q==="string"?q.q:"approval").slice(0,200)};
  if(Array.isArray(q.multi)){if(q.options==null)q.options=q.multi;q.multi=true}
  if(k==="multi"){k="decide";q.multi=true}
  if(q.multi)q.multi=true;else delete q.multi;
  if(QK.indexOf(k)<0){if(k!=null)fix("kind");
   k=q.options!=null?"decide":(q.text||own(q,"ph"))?"text":own(q,"ends")?"scale":Array.isArray(q.items)?(q.items.length&&q.items[0]&&typeof q.items[0]==="object"?"pair":"check"):(own(q,"min")||own(q,"max")||own(q,"unit")||own(q,"quick"))?"number":null;
   if(k==null){k="text";if(q.text==null)fix("kind")}}
  if(q.multi&&k!=="decide"&&k!=="do")delete q.multi;
  if(typeof q.text==="string"&&q.text.trim()&&q.ph==null&&k==="text")q.ph=q.text;delete q.text;
  if(typeof q.q!=="string"||!q.q.trim())return{_nd:rawT(src),why:"question has no title"};
  q.kind=k;if(q.id!=null)q.id=sid(q.id);
  if(q.rows!=null)q.rows=askRows(q.rows);
  if(q.sug!=null&&(typeof q.sug!=="string"||!q.sug.trim())){delete q.sug;fix("sug")}
  if(q.ph!=null&&typeof q.ph!=="string")delete q.ph;
  var set,real,mx;
  if(k==="decide"||k==="do"){
   var opts=[];arr(q.options).forEach(function(o){var l=optLabel(o);if(l==null||!l.trim()){if(o!=null){fix("option");if(typeof o==="object")nd(o,"stray item among options")}return}var n={label:l};if(o&&typeof o==="object"){if(o.pick)n.pick=true;if(o.more!=null&&typeof o.more!=="object"&&String(o.more).trim())n.more=String(o.more)}opts.push(n)});
   var isSkip=function(o){return o.label.trim().toUpperCase()==="SKIP QUESTION"},sk=opts.filter(isSkip);real=opts.filter(function(o){return !isSkip(o)});
   if(!real.length)return{_nd:rawT(src),why:"question has no options"};
   distinct(real,function(o){return o.label},function(o,l){o.label=l});
   if(q.multi){if(sk.length)fix("skip");opts=real}
   else if(sk.length){if(sk.length>1||opts.indexOf(sk[0])!==opts.length-1)fix("skip");opts=real.concat([sk[0]])}
   else opts=k==="decide"?real.concat([{label:"SKIP QUESTION"}]):real;
   set=pickSet(q,opts,function(o){return o.label});var miss=set.miss;opts.forEach(function(o,i){if(o.pick&&set.indexOf(i)<0)set.push(i);delete o.pick});set.sort(function(a,b){return a-b});delete q.pick;
   if(q.multi){mx=q.max;if(mx!=null){mx=typeof mx==="string"?parseFloat(mx):mx;if(!(typeof mx==="number"&&mx>=1&&mx%1===0&&mx<opts.length)){delete q.max;fix("max")}else q.max=mx}
    if(q.max&&set.length>q.max){set=set.slice(0,q.max);miss=true}}
   else{delete q.max;if(set.length!==1){set=[];miss=true}}
   if(miss)fix("pick");
   set.forEach(function(i){opts[i].pick=true});q.options=opts}
  else if(k==="check"||k==="rank"||k==="drag"){
   var items=[];arr(q.items).forEach(function(o){var l=optLabel(o);if(l!=null&&l.trim())items.push(l);else if(o!=null)fix("option")});
   if(!items.length)return{_nd:rawT(src),why:"question has no items"};
   var box=items.map(function(l){return{l:l}});distinct(box,function(o){return o.l},function(o,l){o.l=l});items=box.map(function(o){return o.l});q.items=items;
   if(k==="check"){if(q.pick!=null){set=pickSet(q,items,function(o){return o});if(set.miss)fix("pick");q.pick=set.map(function(i){return items[i]})}}else delete q.pick}
  else if(k==="pair"){
   var its=[],ids={};arr(q.items).forEach(function(x,i){if(!x||typeof x!=="object"||x.text==null||x.a==null||x.b==null||!String(x.text).trim()||!String(x.a).trim()||!String(x.b).trim()||String(x.a)===String(x.b)){fix("item");return}
    var y={id:sid(x.id!=null&&String(x.id)?x.id:"p"+(i+1)),text:String(x.text),a:String(x.a),b:String(x.b)};while(ids[y.id])y.id+="_";ids[y.id]=1;
    if(x.pick==="a"||x.pick===y.a)y.pick=y.a;else if(x.pick==="b"||x.pick===y.b)y.pick=y.b;else if(x.pick!=null)fix("pick");its.push(y)});
   if(!its.length)return{_nd:rawT(src),why:"question has no items"};q.items=its}
  else if(k==="scale"){var en=arr(q.ends).map(function(x){return x==null||typeof x==="object"?"":String(x)});while(en.length<2)en.push("");q.ends=en.slice(0,2);if(q.pick!=null&&!(typeof q.pick==="number"&&q.pick>=1&&q.pick<=5&&q.pick%1===0)){delete q.pick;fix("pick")}}
  else if(k==="number"){["min","max","step","pick"].forEach(function(f){if(q[f]==null)return;var v=typeof q[f]==="number"?q[f]:parseFloat(q[f]);if(typeof q[f]!=="number")fix("number");if(typeof v==="number"&&isFinite(v))q[f]=v;else delete q[f]});
   if(q.min!=null&&q.max!=null&&q.min>=q.max){delete q.min;delete q.max;fix("number")}
   if(q.step!=null&&!(q.step>0))delete q.step;
   if(q.pick!=null&&((q.min!=null&&q.pick<q.min)||(q.max!=null&&q.pick>q.max))){delete q.pick;fix("pick")}
   if(q.quick!=null)q.quick=arr(q.quick).filter(function(v){return typeof v==="number"&&isFinite(v)}).slice(0,6);
   if(q.unit!=null)q.unit=typeof q.unit==="object"?"":String(q.unit)}
  return q}
 function sortAsks(list,keepKind){var out=[];arr(list).forEach(function(x){var q;try{q=nAsk(x)}catch(e){q={_nd:rawT(x),why:"could not be read"}}
  if(!q)return;if(q._bad!=null){BAD.push({label:q.label,why:q._bad});return}if(q._nd!=null){nd(q._nd,q.why||"question");return}out.push(q)});return out}
 function nIdea(I,implicit){
  if(I==null){fix("empty");return null}
  if(typeof I==="string")I={t:I};
  if(typeof I!=="object"||Array.isArray(I)){nd(I,"idea");return null}
  I=Object.assign({},I);var loose=names(I,"asks",["questions","question","ask"])||!!I._loose;names(I,"steps",["step","todos","todo"]);names(I,"rows",["row"]);
  if(lone(I)){I={asks:[I]};implicit=true;loose=true;fix("shape")}
  var n0=ND.length+BAD.length,o={},t=I.t;
  if((typeof t!=="string"||!t.trim())&&typeof I.title==="string"&&I.title.trim()){t=I.title;if(!implicit)fix("key")}
  if(typeof t!=="string"||!t.trim()){t="This round";if(!implicit)fix("title")}
  o.t=t;if(typeof I.line==="string")o.line=I.line;
  o.rows=nRows(I.rows,false);
  o.steps=[];arr(I.steps).forEach(function(x){var s;try{s=nStep(x)}catch(e){s={_nd:rawT(x)}}if(!s)return;if(s._nd!=null){nd(s._nd,"step");return}o.steps.push(s)});
  LOOSE=loose;try{o.asks=sortAsks(I.asks)}finally{LOOSE=false}
  if(Array.isArray(I.mem)){o.mem=I.mem.filter(function(m){return m&&typeof m==="object"&&typeof m.file==="string"&&m.line!=null}).map(function(m){m=Object.assign({},m);m.line=String(m.line);if(m.was!=null)m.was=String(m.was);if(m.sha!=null)m.sha=String(m.sha);return m});if(!o.mem.length)delete o.mem}
  o._open=o.steps.length||o.asks.length||ND.length+BAD.length>n0;
  if(!(o.rows.length||o.steps.length||o.asks.length||o.mem||ND.length+BAD.length>n0)){fix("empty");return null}
  return o}
 if(typeof input==="string"){var rd=readText(input,whole);if(rd.fail)return{fail:rd.fail,round:(/\b[a-z]{2,8}\d{1,4}\b/.exec(input)||["unknown"])[0]};
  R0=rd.R;Object.keys(rd.rep).forEach(function(k){REP[k]=(REP[k]||0)+rd.rep[k]});VOID=VOID||rd.voided;if(Object.keys(rd.rep).length)SHAKY=true;(rd.stray||[]).forEach(function(s){nd(s,"stray text")});var sj=(rd.stray||[]).join("\n");if(/\uD83D\uDD10|(^|[^\w])(action|code)["']?\s*(:|$)/m.test(sj)){var am=/action["']?\s*:\s*["']([^"']{1,200})/.exec(sj);BAD.push({label:am?am[1]:"approval",why:"lost in damaged page text"})}}
 var wasArr=Array.isArray(R0);
 if(wasArr){var e0=R0.filter(function(x){return x&&typeof x==="object"})[0]||{};fix("shape");
  R0=(own(e0,"q")||own(e0,"options")||own(e0,"kind")||own(e0,"multi")||own(e0,"code")||own(e0,"action"))?{asks:R0}:(own(e0,"asks")||own(e0,"rows")||own(e0,"steps")||own(e0,"t"))?{ideas:R0}:{rows:R0}}
 if(!R0||typeof R0!=="object")return{fail:"the page data is not a round",round:"unknown"};
 R0=Object.assign({},R0);var topLoose=names(R0,"asks",["questions","question","ask"])||wasArr;names(R0,"steps",["step","todos","todo"]);names(R0,"rows",["row"]);names(R0,"ideas",["idea"]);
 if(lone(R0)){var one=Object.assign({},R0);delete one.round;delete one.finish;delete one.open;delete one.root;delete one.shots;R0={round:R0.round,finish:R0.finish,open:R0.open,root:R0.root,shots:R0.shots,asks:[one]};topLoose=true;fix("shape")}
 var R={},rid=typeof R0.round==="string"?R0.round.trim():(typeof R0.round==="number"?"iqp"+R0.round:"");
 var ridOk=true;if(!/^[a-z]{2,8}\d{1,4}$/.test(rid)){var lo=rid.toLowerCase().replace(/\s+/g,"");ridOk=/^[a-z]{2,8}\d{1,4}$/.test(lo);rid=ridOk?lo:"iqp0";fix("round")}
 R.round=rid;["shots","root","file"].forEach(function(k){if(R0[k]!=null)R[k]=R0[k]});if(typeof R.root!=="string")delete R.root;
 var topHas=["rows","steps","asks","mem"].some(function(k){return arr(R0[k]).length>0}),flat=R0.ideas==null&&!topHas&&Array.isArray(R0.screens)&&R0.screens.length>0,open=false,asksOpen=false;
 if(flat){
  R.screens=[];if(typeof R0.title==="string")R.title=R0.title;if(Array.isArray(R0.mem))R.mem=R0.mem.filter(function(m){return m&&typeof m==="object"&&typeof m.file==="string"});
  R0.screens.forEach(function(sc){
   if(sc&&typeof sc==="object"&&!Array.isArray(sc)&&(sc.kind==="report"||sc.kind==="todo"||(sc.kind==null&&sc.q==null&&sc.rows!=null&&!own(sc,"code")&&!own(sc,"action")&&sc.options==null&&sc.items==null&&!own(sc,"ends")))){
    var kind=sc.kind||guessKind({rows:arr(sc.rows).filter(function(x){return x&&typeof x==="object"})}),rows=nRows(sc.rows,false);if(!rows.length)return;
    var o={kind:kind,rows:rows};if(sc.id!=null)o.id=sid(sc.id);if(kind==="todo")open=true;R.screens.push(o);return}
   var a=sortAsks([sc]);if(a.length){R.screens.push(a[0]);open=asksOpen=true}});
  var sids={};R.screens.forEach(function(q){if(q.id!=null){while(sids[q.id])q.id+="_";sids[q.id]=1}});
  deepEm(R.screens)}
 else{
  var ideas=[],raw=R0.ideas==null?[]:(Array.isArray(R0.ideas)?R0.ideas:[R0.ideas]),extra=[];
  if(topHas||(R0.ideas==null&&(typeof R0.t==="string"||typeof R0.title==="string"))){if(raw.length)fix("shape");raw=[{t:typeof R0.t==="string"?R0.t:R0.title,line:R0.line,rows:R0.rows,steps:R0.steps,asks:R0.asks,mem:R0.mem,_imp:true,_loose:topLoose}].concat(raw)}
  if(Array.isArray(R0.screens)&&R0.screens.length){fix("shape");var xr=[],xa=[];R0.screens.forEach(function(sc){if(sc&&typeof sc==="object"&&(sc.kind==="report"||sc.kind==="todo"||(sc.q==null&&sc.rows!=null)))xr=xr.concat(arr(sc.rows));else xa.push(sc)});raw.push({rows:xr,asks:xa,_imp:true,_loose:true})}
  raw.forEach(function(I){var o;try{o=nIdea(I,!!(I&&I._imp))}catch(e){nd(I,"idea");o=null}if(o)ideas.push(o)});
  var qids={};ideas.forEach(function(I){I.asks.forEach(function(q){if(q.id!=null){if(qids[q.id]){delete q.id;fix("id")}else qids[q.id]=1}});
   var s2={};I.steps.forEach(function(x){if(x.id!=null){if(s2[x.id]){delete x.id;fix("id")}else s2[x.id]=1}});
   if(I.steps.length||I._open)open=true;if(I.asks.length)asksOpen=true;delete I._open;deepEm(I,true)});
  var n=0,used={};ideas.forEach(function(I){I.asks.forEach(function(q){if(q.id!=null)used[q.id]=1})});
  ideas.forEach(function(I){I.asks.forEach(function(q){n++;if(q.id==null){var id="q"+n;while(used[id])id+="_";q.id=id;used[id]=1}})});
  R.ideas=ideas;R.screens=[]}
 if(ND.length||BAD.length)open=true;if(BAD.length)asksOpen=true;
 var f=R0.finish,m;
 if(f!=null){
  if(typeof f==="string"){m=/^\s*(delete|keep)\s*:?\s*([\s\S]*)$/i.exec(f);f=m?(m[1].toLowerCase()==="delete"?{kind:"delete",pickup:m[2]}:{kind:"keep",why:m[2]}):null}
  else if(typeof f==="object"&&!Array.isArray(f)){f=Object.assign({},f);if(typeof f.kind==="string")f.kind=f.kind.toLowerCase().trim();if(f.kind!=="delete"&&f.kind!=="keep")f=null}
  else f=null;
  if(!f){fix("ending");if(!(typeof R0.open==="string"&&R0.open.trim()))R0=Object.assign({},R0,{open:"Claude continues"})}
  else{["pickup","why","after"].forEach(function(k){if(f[k]!=null)f[k]=typeof f[k]==="object"?"":String(f[k]);if(f[k]==="")delete f[k]});
   if(SHAKY||(f.after?(!flat&&(asksOpen||ND.length>0||BAD.length>0)):open)){f=null;fix("finish")}}}
 if(f)R.finish=deepEm(f,true);
 if(typeof R0.open==="string"&&R0.open.trim())R.open=deepEm(R0.open);
 if(!flat&&!f&&!asksOpen&&!R.open){R.open="Claude continues";fix("ending")}
 var cps=0;(function w(v){if(Array.isArray(v))v.forEach(w);else if(v&&typeof v==="object"){if(v.c!=null&&v._dmg)cps++;Object.keys(v).forEach(function(k){w(v[k])})}})(R);if(cps)REP.copy=cps;
 var any=flat?R.screens.length:R.ideas.length;
 if(!any&&!ND.length&&!BAD.length)return{fail:"no rows, steps or questions were found",round:ridOk?rid:"unknown",rep:REP};
 return{R:R,rep:REP,nd:ND,bad:BAD,round:rid}}
function mountCore(P){var R0=P.R,REP=P.rep,ND=P.nd,BAD=P.bad;
 if(!document.getElementById("qp5-css")){var st=el("style");st.id="qp5-css";st.textContent=CSS5;document.head.appendChild(st)}
 if(R0.shots!==false&&!document.querySelector("form.elicit")){var fw=document.createElement("div");fw.innerHTML=FORM;document.body.appendChild(fw.firstElementChild)}
 var host=hostOf(R0.root),FIN=(R0.finish&&!R0.finish.after)?R0.finish:null;
 var R=prep(R0);
 if(R.ideas==null){var rows=[],steps=[],asks=[];(R.screens||[]).forEach(function(q){if(q.kind==="report"){(q.rows||[]).forEach(function(x){var e=first(x.s||"");if(FIN&&(e.indexOf("🗑")===0||e.indexOf("💾")===0))return;rows.push(x)})}else if(q.kind==="todo"){(q.rows||[]).forEach(function(x,j){steps.push({id:x.id||q.id+"_"+j,s:String(x.s||"").replace(/^\S+\s+/,""),m:x.m})})}else asks.push(q)});
  R.ideas=[{t:R0.title||"This round",rows:rows,steps:steps,asks:asks}].filter(function(I){return I.rows.length||I.steps.length||I.asks.length})}
 R.screens=[];
 var qp=el("div","q5");qp.setAttribute("lang","en");
 var S={tuck:{},open:{},sum:false,sent:false,changed:false,auto:[],review:false,later:[],front:null},A={},HID={},SK={},H=[],PRE={},NT={},SH={},DIS={},SUG={},STY={},AUTON={},shotTarget=null,canShot=!!document.querySelector("form.elicit"),touch=false;try{touch=matchMedia("(pointer:coarse)").matches}catch(e){}
 var pick=el("input");pick.type="file";pick.multiple=true;pick.accept="image/*";
 var ITEMS=[];R.ideas.forEach(function(I,k){I._n=KC[k]||String(k+1);(I.steps||[]).forEach(function(x,j){ITEMS.push({t:"step",k:k,id:"_st"+k+"_"+(x.id||String(j)),x:x})});(I.asks||[]).forEach(function(q){ITEMS.push({t:"q",k:k,id:q.id,q:q})})});
 ITEMS.forEach(function(it){if(it.q&&it.q.sug&&!it.q.code&&it.q.kind!=="text"){SUG["q:"+it.id]=it.q.sug;STY["q:"+it.id]=it.q.sugStyle||"ghost"}});
 function sugVal(key){return key.indexOf("t:")===0?A[key.slice(2)]:NT[key]}
 function sugOn(key){return SUG[key]!=null&&!DIS[key]&&!String(sugVal(key)||"").trim()}
 function sugChip(key){if(STY[key]==="ghost")return tb('data-sug="'+key+'"',TB5+"display:flex;width:100%;justify-content:space-between;gap:10px;min-height:44px;padding:4px;font-size:16px;line-height:1.4;text-align:left;color:"+C5.sub+";font-style:italic;",'<span>'+esc5(SUG[key])+'</span><span style="flex:none;font-style:normal;font-size:14px;padding:6px 14px;border-radius:999px;background:'+rgba5(C5.ac[3],.2)+';color:'+C5.ac[3]+'">Use</span>');return tb('data-sug="'+key+'"',TB5+"display:flex;flex-direction:column;align-items:flex-start;width:100%;text-align:left;font-size:16px;line-height:1.4;padding:10px 14px;min-height:44px;border:none;border-radius:12px;background:"+rgba5(C5.ac[3],.2)+";color:"+C5.ink+";outline:2px dashed "+rgba5(C5.ink,.85)+";outline-offset:2px;",'<span>'+esc5(SUG[key])+'</span><span style="font-size:13px;color:'+C5.ac[3]+';margin-top:4px">Tap to use</span>')}
 function sugWrap(key,bg,ta){if(!sugOn(key))return ta;var t=ta.replace(/background:[^;]*;border:1px solid rgba\(255,255,255,\.08\);border-radius:12px;padding:12px 14px;margin:[^"]*"/,'background:transparent;border:none;border-radius:0;padding:12px 4px 2px;margin:0"').replace(/placeholder="[^"]*"/,'placeholder="or type your own"');
  return '<div data-sugbox="'+key+'" style="background:'+bg+';border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px;margin:'+(key.indexOf("t:")===0?"0 0 6px":"10px 0 4px")+';cursor:text">'+sugChip(key)+t+'</div>'}
 function col(s){var e=first(s||"").replace(/️/g,"");return e==="⚠"?C5.yel:e==="❌"?C5.red:e==="🧠"?C5.pink:C5.ink}
 function wt(s){var e=first(s||"").replace(/️/g,"");return (e==="⚠"||e==="❌"||e==="🧠")?500:400}
 function split(s){var m=null;try{m=EMO.exec(s||"")}catch(x){}return m?[m[1],m[2]]:["",s||""]}
 var F=fold(R);
 function cpH(c,dm){var text=typeof c==="string"?c:c.text;if(dm)return '<div class="cpd" style="color:'+C5.red+';border:1px solid '+C5.red+';border-radius:12px;padding:8px 12px;margin:6px 0;font-size:15px;overflow-wrap:anywhere">Copy text may be damaged, ask Claude to resend<pre style="margin:6px 0 0;font:13.5px/1.45 ui-monospace,Menlo,monospace;white-space:pre-wrap;overflow-wrap:anywhere;color:'+C5.dim+'">'+esc5(text)+'</pre></div>';var url=/^https?:\/\/\S+$/.test(String(text||"").trim());return '<div class="cp"><pre>'+esc5(text)+'</pre>'+tb('data-copy="'+esc5(text)+'"'+(url?' data-url="1"':''),chipS(C5.ac[0],false,false)+"font-size:14px;padding:6px 12px;min-height:36px;",url?"Copy & open":"Copy")+'</div>'}
 function detH(m){if(m==null)return"";if(!Array.isArray(m))return rich5(m);var allP=m.length>1&&m.every(function(x){return x&&typeof x==="object"&&x.p!=null&&x.c==null&&x.s==null});
  if(allP)return "<ul>"+m.map(function(x){return "<li>"+rich5(x.p)+"</li>"}).join("")+"</ul>";
  return m.map(function(x){if(x==null)return"";if(typeof x!=="object")return "<div>"+rich5(x)+"</div>";if(x.c!=null)return cpH(x.c,x._dmg);if(x.s!=null)return '<div class="sh">'+rich5(x.s)+'</div><div>'+detH(x.m)+'</div>';return "<div>"+rich5(x.p)+"</div>"}).join("")}
 function tb(at,s,t){return '<div role="button" tabindex="0" '+at+' style="'+s+'">'+t+'</div>'}
 function chipS(c,sel,pk,full){return TB5+"font-size:16px;padding:10px 16px;min-height:44px;border:none;border-radius:"+(full?"14px":"999px")+";"+(full?"display:flex;flex-direction:column;align-items:flex-start;width:100%;text-align:left;line-height:1.3;overflow-wrap:anywhere;-webkit-hyphens:auto;hyphens:auto;":"")+(sel?"background:"+c+";color:"+C5.navy+";":"background:"+rgba5(c,.2)+";color:"+c+";")+(pk?"outline:2px dashed "+rgba5(C5.ink,.85)+";outline-offset:3px;":"")}
 function pill(at,inner,c){return tb(at,TB5+"gap:10px;white-space:nowrap;font-size:17px;padding:11px 18px;border-radius:999px;border:1px solid "+(c||C5.dim)+";color:"+(c||C5.ink),inner)}
 function band(id,ph,bg){return sugWrap(id,bg,'<textarea data-note="'+id+'" rows="1" placeholder="'+esc5(ph)+'" style="display:block;width:100%;box-sizing:border-box;font:inherit;font-size:16px;line-height:1.4;color:'+C5.ink+';resize:none;overflow:hidden;outline:none;-webkit-appearance:none;appearance:none;min-height:0;background:'+bg+';border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px 14px;margin:10px 0 4px">'+esc5(NT[id]||"")+'</textarea>')+(canShot?'<div class="thumbs" data-thumbs="'+id+'"></div>':'')}
 function topH(){var kept=F.keep,dn=F.done;if(!kept.length&&!dn.length)return"";var multi=R.ideas.filter(function(I){return (I.rows||[]).length}).length>1,n=Object.keys(S.tuck).length,h="";
  kept.forEach(function(g){var vis=g.rows.filter(function(o){return !S.tuck[o.id]});if(!vis.length)return;if(multi)h+='<div class="il">'+rich5(R.ideas[g.k].t)+'</div>';
   vis.forEach(function(o){var p=split(o.r.s),has=o.r.m!=null;h+='<div data-item="1" class="'+(S.open[o.id]?"open":"")+'"><div class="rw"><div class="'+(has?"rt cl":"rt")+'" data-tuck="'+o.id+'" style="color:'+col(o.r.s)+';font-weight:'+wt(o.r.s)+'"><span>'+esc5(p[0])+'</span><span>'+rich5(p[1])+'</span></div>'+(has?'<span class="ar" data-arr="'+o.id+'" style="transform:rotate('+(S.open[o.id]?90:0)+'deg)">›</span>':'<span style="min-width:40px"></span>')+'</div>'+(has&&S.open[o.id]?'<div class="dt">'+detH(o.r.m)+'</div>':'')+'</div>'});h+='<div class="rw" style="justify-content:flex-end">'+skipChip('data-skiprows="'+g.k+'"')+'</div>'});
  return '<div class="tp">'+h+doneH(multi)+band("_top","+ a note","rgba(255,255,255,.05)")+(n?'<div class="rw" style="margin:10px 0 2px">'+tb('data-showtop="1"',TB5+"font-size:15px;color:"+C5.dim+";padding:8px 0","↺ "+n)+'</div>':'')+'</div>'}
 function doneH(multi){var dn=F.done;if(!dn.length)return"";
  if(!S.sum)return '<div class="dn">'+tb('data-sum="1"',TB5+"display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;",'<div class="sm" style="flex:1;min-width:0">'+sumParts(dn).map(function(t){return '<span style="color:'+col(t)+';font-weight:'+wt(t)+'">'+rich5(t)+'</span>'}).join('<span style="color:'+C5.dim+'"> · </span>')+'</div><span style="flex:none;color:'+C5.dim+';font-size:16px;padding:0 6px">›</span>')+'</div>';
  var h=tb('data-sum="1"',TB5+"font-size:15px;color:"+C5.dim+";padding:8px 0;min-height:40px","Hide ⌃");
  R.ideas.forEach(function(I,k){var its=dn.filter(function(o){return o.k===k});if(!its.length)return;if(multi)h+='<div class="il">'+rich5(I.t)+'</div>';
   its.forEach(function(o){var p=split(o.r.s);h+='<div class="rw"><div class="rt" style="cursor:default;color:'+col(o.r.s)+';font-weight:'+wt(o.r.s)+'"><span>'+esc5(p[0])+'</span><span>'+rich5(p[1])+'</span></div></div>'+(o.r.m!=null?'<div class="dt">'+detH(o.r.m)+'</div>':'')})});
  return '<div class="dn">'+h+'</div>'}
 function isAns(it){var a=A[it.id];if(it.t==="step")return a!=null;var k=it.q.kind;if(k==="text")return !!(a&&String(a).trim());if(k==="date")return !!((a!=null&&a!=="")||String(NT["q:"+it.id]||"").trim());if(k==="pair")return a&&it.q.items.every(function(x){return a[x.id]});if(k==="check"||k==="rank"||k==="drag"||(k==="decide"&&it.q.multi)||k==="number")return !!HID[it.id];return a!=null&&a!==""}
 function hidden(it){if(S.review)return false;if(SK[it.id])return true;if(it.q&&(it.q.kind==="text"||it.q.kind==="date"))return !!HID[it.id];return isAns(it)||!!HID[it.id]}
 function dotC(it){var a=A[it.id];if(!isAns(it))return null;if(it.t==="step")return C5.mint;var q=it.q;if(q.code)return a&&String(a).indexOf("🔐")===0?C5.gold:C5.dim;if(q.kind==="decide"&&!q.multi){var i=q.options.map(function(o){return o.label}).indexOf(a);return C5.ac[(i<0?0:i)%4]}return C5.ac[ITEMS.indexOf(it)%4]}
 function dots(){return ITEMS.map(function(it){var c=dotC(it);var z=ITEMS.length>8?6:8,mg=ITEMS.length>8?1:2;return '<span style="display:inline-block;flex:none;width:'+z+'px;height:'+z+'px;border-radius:50%;margin:0 '+mg+'px;background:'+(c||"transparent")+';border:1.5px solid '+(c||C5.dim)+'"></span>'}).join("")}
 function full(opts){return opts.some(function(o){return o.more||Array.from(String(o.label||"")).length>18})}
 function skipChip(at,t){return tb(at,TB5+"font-size:15px;padding:8px 14px;min-height:40px;border-radius:999px;color:"+C5.dim+";border:1px dashed rgba(255,255,255,.25);margin-top:4px",t||"Skip ›")}
 function hasSkipOpt(q){return (q.kind==="decide"||q.kind==="do")&&!q.multi&&(q.options||[]).some(function(o){return String(o.label||"").trim().toUpperCase()==="SKIP QUESTION"})}
 function doneChip(id){return tb('data-done="'+id+'"',TB5+"font-size:15px;padding:8px 14px;min-height:40px;border-radius:999px;color:"+C5.sub+";border:1px solid rgba(255,255,255,.15);margin-top:4px","Done ✓")}
 function itemH(it,glow){var h="",id=it.id;
  if(it.t==="step"){var x=it.x;h='<div class="qt"><span class="qtt">'+rich5(x.s)+'</span></div>'+(x.m!=null?'<div class="qr">'+detH(x.m)+'</div>':'')+'<div class="ch">'+tb('data-step="'+id+'"',chipS(C5.mint,false,false),"Done")+skipChip('data-skip="'+id+'"')+'</div>';return '<div class="qi'+(glow?" gl":"")+'" data-item="1">'+h+'</div>'}
  var q=it.q,k=q.kind,a=A[id];h='<div class="qt"><span class="qtt">'+(q.code?"🔐 ":"")+rich5(q.q)+'</span></div>';(q.rows||[]).forEach(function(r){h+='<div class="qr">'+rich5(r.s||r.p||"")+(r.m!=null?"<div>"+detH(r.m)+"</div>":"")+'</div>'});
  if(k==="decide"||k==="do"){var fl=q.code||full(q.options),cur=q.multi&&Array.isArray(a)?a:[];
   h+='<div class="ch'+(fl?" col":"")+'">'+q.options.map(function(o,i){var c=q.code?(i?C5.gold:C5.dim):C5.ac[i%4],sel=q.multi?cur.indexOf(i)>=0:(a===o.label);return tb('data-ans="'+id+'" data-i="'+i+'"',chipS(c,sel,!q.code&&o.pick,fl),'<span>'+rich5(o.label)+(sel?" ✓":"")+'</span>'+(o.more&&String(o.label).indexOf(txt5(o.more))<0?'<span class="mo">'+esc5(txt5(o.more))+'</span>':''))}).join("")+'</div>';
   if(q.multi){var mxd=q.max&&cur.length>=q.max;h+=(q.max?'<div class="more"'+(mxd?' data-max="1" style="color:'+C5.yel+(S.maxed===id?';font-weight:600':'')+'"':'')+'>Pick up to '+q.max+(mxd?' · max reached, untap one to change':'')+'</div>':'')+doneChip(id)}}
  else if(k==="pair"){var v=a||{};q.items.forEach(function(x){if(v[x.id]&&!S.review)return;h+='<div class="pi">'+rich5(x.text)+'</div><div class="ch">'+[x.a,x.b].map(function(o,i){return tb('data-pair="'+id+'" data-pid="'+esc5(x.id)+'" data-i="'+i+'"',chipS(C5.ac[i%4],v[x.id]===o,x.pick===o&&!v[x.id]),rich5(o))}).join("")+'</div>'})}
  else if(k==="scale"){h+='<div class="ch" style="gap:8px;flex-wrap:nowrap">'+[1,2,3,4,5].map(function(n){return tb('data-scale="'+id+'" data-i="'+n+'"',TB5+"justify-content:center;width:44px;height:44px;border-radius:50%;font-size:17px;background:"+(a===n+" of 5"?C5.blue:rgba5(C5.blue,.08+n*.05))+";color:"+(a===n+" of 5"?C5.navy:C5.blue)+(q.pick===n?";outline:2px dashed "+rgba5(C5.ink,.85)+";outline-offset:3px":""),String(n))}).join("")+'</div><div class="ends"><span>1 · '+esc5((q.ends||[])[0]||"")+'</span><span>'+esc5((q.ends||[])[1]||"")+' · 5</span></div>'}
  else if(k==="date"){var t=new Date();t.setHours(0,0,0,0);var d1=new Date(t.getFullYear(),t.getMonth(),t.getDate()+1),sat=new Date(t.getFullYear(),t.getMonth(),t.getDate()+((6-t.getDay()+7)%7||7)),pre=[["Today",t],["Tomorrow",d1],["Saturday",sat]],pv=pre.map(function(x){return dval(x[1],t)}),od=a!=null&&a!==""&&pv.indexOf(a)<0;
   h+='<div class="ch">'+pre.map(function(x,i){return tb('data-date="'+id+'" data-v="'+esc5(pv[i])+'"',chipS(C5.ac[i%4],a===pv[i],false),x[0]+" · "+pv[i])}).join("")+'<label data-odate="'+id+'" style="position:relative;overflow:hidden;'+chipS(C5.ac[3],od,false)+'"><span data-odl="'+id+'">📅 '+(od?esc5(a)+" ✓":"Other day")+'</span><input data-datein="'+id+'" type="date" aria-label="Other day" style="position:absolute;inset:0;width:100%;height:100%;opacity:0;border:0;padding:0;margin:0;font-size:16px;cursor:pointer;color-scheme:dark;-webkit-appearance:none;appearance:none"></label></div>'+band("q:"+id,"+ a note","rgba(0,0,0,.18)")+doneChip(id)}
  else if(k==="number"){var val=a!=null&&a!==""?parseFloat(a):(q.pick!=null?q.pick:(q.min!=null?q.min:0)),u=q.unit?" "+q.unit:"",sb=TB5+"justify-content:center;width:44px;height:44px;border-radius:50%;font-size:22px;background:"+rgba5(C5.blue,.15)+";color:"+C5.blue;
   h+='<div style="display:flex;align-items:center;gap:14px;padding:0 0 10px">'+tb('data-num="'+id+'" data-d="-1"',sb,"−")+'<span style="font-size:24px;min-width:44px;text-align:center">'+esc5(fmt5(val)+u)+'</span>'+tb('data-num="'+id+'" data-d="1"',sb,"+")+'</div>';
   if((q.quick||[]).length)h+='<div class="ch">'+q.quick.map(function(v,i){return tb('data-nq="'+id+'" data-v="'+v+'"',chipS(C5.ac[i%4],a!=null&&parseFloat(a)===v,a==null&&q.pick===v),esc5(fmt5(v)+u))}).join("")+'</div>';
   if(q.min!=null||q.max!=null)h+='<div class="more">'+(q.min!=null?fmt5(q.min):"")+" to "+(q.max!=null?fmt5(q.max):"")+esc5(u)+'</div>';h+=doneChip(id)}
  else if(k==="check"){var cv=A[id]||(q.pick||[]).slice();h+='<div style="display:flex;flex-direction:column;gap:2px;padding:0 0 6px">'+q.items.map(function(o,i){var s=cv.indexOf(o)>=0,c=C5.ac[i%4];return tb('data-ck="'+id+'" data-i="'+i+'"',TB5+"gap:12px;min-height:44px;font-size:17px;color:"+(s?C5.ink:C5.sub),'<span style="width:22px;height:22px;border-radius:7px;border:2px solid '+c+';background:'+(s?c:"transparent")+';color:'+C5.navy+';font-size:14px;display:inline-flex;align-items:center;justify-content:center">'+(s?"✓":"")+'</span>'+rich5(o))}).join("")+'</div>'+doneChip(id)}
  else if(k==="rank"||k==="drag"){var rv=RK[id]||[];h+='<div class="ch col">'+q.items.map(function(o,i){var n=rv.indexOf(o);return tb('data-rk="'+id+'" data-i="'+i+'"',chipS(C5.ac[i%4],n>=0,false,true)+"flex-direction:row;align-items:center;gap:12px;",'<span style="width:26px;height:26px;flex:none;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid '+(n>=0?C5.navy:C5.ac[i%4])+'">'+(n>=0?n+1:"")+'</span><span>'+rich5(o)+'</span>')}).join("")+'</div>'+doneChip(id)}
  else if(k==="text"){h+=sugWrap("t:"+id,"rgba(0,0,0,.18)",'<textarea data-text="'+id+'" rows="1" placeholder="'+esc5(q.ph||"Type or talk")+'" style="display:block;width:100%;box-sizing:border-box;font:inherit;font-size:16px;line-height:1.4;color:'+C5.ink+';resize:none;overflow:hidden;outline:none;-webkit-appearance:none;appearance:none;min-height:0;background:rgba(0,0,0,.18);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px 14px;margin:0 0 6px">'+esc5(A[id]||"")+'</textarea>')+doneChip(id)}
  if((q.note||(q.sug&&!q.code&&k!=="text"))&&k!=="date")h+=band("q:"+id,"+ a note","rgba(0,0,0,.18)");
  if(!q.code&&!hasSkipOpt(q))h+=skipChip('data-skip="'+id+'"');
  return '<div class="qi'+(glow?" gl":"")+'" data-item="1">'+h+'</div>'}
 var RK={};
 function ndH(){var bx="border-radius:12px;padding:8px 12px;margin:6px 0;font-size:15px;line-height:1.4;overflow-wrap:anywhere;";
  return BAD.map(function(b){return '<div class="badcode" style="'+bx+'color:'+C5.red+';border:1px solid '+C5.red+'">Approval not drawn: '+esc5(b.why)+'<div style="color:'+C5.sub+'">'+esc5(b.label)+'</div></div>'}).join("")+
   ND.map(function(x){return '<div class="nd" style="'+bx+'color:'+C5.dim+';border:1px dashed rgba(255,255,255,.25)">Not drawn'+(x.why?' ('+esc5(x.why)+')':'')+': '+esc5(x.text)+'</div>'}).join("")}
 function allDone(){return ITEMS.every(function(it){return isAns(it)||SK[it.id]||(it.q&&it.q.kind==="text")})}
 function userH(){if(FIN){var ok=FIN.kind==="delete";return '<div class="fin"><div style="font-size:19px;color:'+C5.ink+'">'+(ok?"🗑️ Safe to close & delete":"💾 Safe to close, keep this chat")+'</div><div class="dt" style="padding:6px 0 0"><ul>'+["Nothing left for Claude","Nothing left for the user","Nothing needed later lives only here","No file lives only here","Nothing still running","No chat must read it first","Nothing links to this chat"].map(function(x){return "<li>✓ "+x+"</li>"}).join("")+'</ul><div>'+rich5(ok?"Pickup point: "+(FIN.pickup||"nothing to pick up"):(FIN.why||FIN.pickup||"Worth keeping to look back at."))+'</div></div></div>'}
  if(S.sent)return tb('data-unsend="1"',TB5+"width:100%;justify-content:space-between;background:rgba(255,255,255,.07);border-radius:14px;padding:14px 16px;font-size:17px;color:"+C5.mint+";margin:0 0 14px",'<span>✓ Sent · '+esc5(S.words)+'</span><span style="display:inline-flex;align-items:center;gap:8px;color:'+C5.dim+';font-size:15px">'+dots()+' edit</span>');
  var vis=ITEMS.filter(function(it){return !hidden(it)}),nh=ITEMS.length-vis.length,done=allDone(),body="";
  if(ITEMS.length&&done&&!vis.length)body='<div style="font-size:17px;color:'+C5.mint+';padding:12px 0 2px">All set ✓</div>';
  else{if(!S.review){var lt=S.later;vis=vis.filter(function(it){return lt.indexOf(it.id)<0}).concat(lt.map(byId).filter(function(it){return it&&vis.indexOf(it)>=0}));var fi=-1;vis.forEach(function(it,j){if(it.id===S.front)fi=j});if(fi>0)vis.unshift(vis.splice(fi,1)[0])}var shown=S.review?vis:vis.slice(0,1),g=-1;shown.forEach(function(it,j){if(g<0&&!isAns(it))g=j});body=shown.map(function(it,j){return itemH(it,j===g)}).join("");if(!S.review&&vis.length>1)body+=tb('data-skipq="'+shown.map(function(it){return it.id}).join(" ")+'" class="more"',TB5+"font-size:15px;color:"+C5.dim+";min-height:44px;padding:0;display:flex;align-items:center",(vis.length-1)+' more after this ›')}
  var lbl="Send",bk=H.length?'<div class="rw" style="justify-content:flex-start">'+skipChip('data-back="1"',"‹ Back")+'</div>':"";
  return '<div class="bd">'+bk+ndH()+body+band("_user","+ a note","rgba(0,0,0,.18)")+'<div class="sr">'+((nh||S.review)?tb('data-showq="1"',TB5+"font-size:15px;color:"+C5.dim+";padding:8px 0",S.review?"Hide answered":"Review "+nh):(canShot&&!touch?tb('data-clip="_user"',TB5+"font-size:18px;padding:6px 8px;color:"+C5.dim,"📎"):"<span></span>"))+pill('data-send="1"',(ITEMS.length?'<span style="display:inline-flex;flex-wrap:wrap;max-width:120px;row-gap:3px">'+dots()+'</span>':'')+lbl+" ↗",done&&ITEMS.length?C5.mint:null)+'</div></div><div style="height:14px"></div>'}
 function hasPicks(){return ITEMS.some(function(it){if(isAns(it)||it.t!=="q")return false;var q=it.q;if(q.code)return false;if(q.kind==="decide")return q.options.some(function(o){return o.pick});if(q.kind==="pair")return true;if(q.kind==="text")return sugOn("t:"+it.id);return q.pick!=null})}
 function grow(t){t.style.height="auto";t.style.height=t.scrollHeight+2+"px"}
 function thumbs(){[].forEach.call(qp.querySelectorAll("[data-thumbs]"),function(tbx){var id=tbx.getAttribute("data-thumbs");tbx.innerHTML="";(SH[id]||[]).forEach(function(f,k){var d=el("div","th"),im=el("img"),x=document.createElement("div");x.setAttribute("role","button");x.textContent="×";x.style.cssText="position:absolute;top:-6px;right:-6px;width:22px;height:22px;border-radius:50%;background:"+C5.navy+";color:"+C5.ink+";border:1px solid "+C5.dim+";display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer";try{im.src=URL.createObjectURL(f)}catch(e){}x.onclick=function(){SH[id].splice(k,1);thumbs()};d.append(im,x);tbx.appendChild(d)})})}
 var KEY="qp5:"+R.round+":"+(function(t){var h=0;for(var i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))|0;return h})(JSON.stringify(R0.ideas||R0.screens||[]));
 function save(){try{localStorage.setItem(KEY,JSON.stringify({A:A,HID:HID,SK:SK,NT:NT,DIS:DIS,RK:RK,changed:S.changed,tuck:S.tuck,sum:S.sum,later:S.later,H:H,PRE:PRE,front:S.front}))}catch(e){}}
 function load(){try{var v=JSON.parse(localStorage.getItem(KEY)||"null");if(!v)return;Object.assign(A,v.A||{});Object.assign(HID,v.HID||{});Object.assign(SK,v.SK||{});Object.assign(NT,v.NT||{});Object.assign(DIS,v.DIS||{});RK=v.RK||{};S.changed=!!v.changed;S.tuck=v.tuck||{};S.sum=!!v.sum;S.later=Array.isArray(v.later)?v.later:[];H=Array.isArray(v.H)?v.H.filter(function(e){return e&&e.s&&byId(e.id)}):[];PRE=v.PRE&&typeof v.PRE==="object"?v.PRE:{};S.front=v.front||null;ITEMS.forEach(function(it){if(it.q&&it.q.multi&&typeof A[it.id]==="string"){var ls=A[it.id].split("; ");A[it.id]=it.q.options.map(function(o,i){return ls.indexOf(o.label)>=0?i:-1}).filter(function(i){return i>=0})}})}catch(e){}}
 function snap(id){var s={};if(A[id]!==undefined)s.A=JSON.parse(JSON.stringify(A[id]));if(id in HID)s.HID=HID[id];if(id in SK)s.SK=SK[id];if(RK[id])s.RK=RK[id].slice();return s}
 function put(id,s){delete A[id];delete HID[id];delete SK[id];delete RK[id];if("A" in s)A[id]=s.A;if("HID" in s)HID[id]=s.HID;if("SK" in s)SK[id]=s.SK;if(s.RK)RK[id]=s.RK.slice()}
 function off(it){return !!SK[it.id]||(it.q&&(it.q.kind==="text"||it.q.kind==="date")?!!HID[it.id]:!!isAns(it))}
 function rec(id,pre,exact){var it=id&&pre?byId(id):null;if(!it||JSON.stringify(snap(id))===JSON.stringify(pre))return;if(off(it)){H.push({id:id,s:exact?pre:(PRE[id]||pre)});delete PRE[id];if(H.length>200)H.shift()}else if(!PRE[id])PRE[id]=pre}
 function back(){var e=H.pop();if(!e)return;put(e.id,e.s);delete PRE[e.id];var i=S.later.indexOf(e.id);if(i>=0)S.later.splice(i,1);S.front=e.id;S.changed=true}
 function draw(){try{draw0()}catch(e){try{qp.innerHTML="";qp.appendChild(tellBox(R.round,"the page stopped drawing: "+String(e&&e.message||e).slice(0,120)))}catch(x){}}}
 function draw0(){save();var w=el("div");w.innerHTML=topH()+userH();qp.innerHTML="";var stash=el("div","stash");stash.appendChild(pick);qp.appendChild(stash);while(w.firstChild)qp.appendChild(w.firstChild);
  [].forEach.call(qp.querySelectorAll("textarea"),function(t){grow(t);var sb=t.parentNode&&t.parentNode.getAttribute&&t.parentNode.getAttribute("data-sugbox");if(sb){t.addEventListener("focus",function(){DIS[sb]=true;var c=t.parentNode.querySelector("[data-sug]");if(c)c.style.display="none";t.placeholder="Type or talk";setTimeout(save,0)});t.addEventListener("blur",function(){if(t.value.trim())return;DIS[sb]=false;var c=t.parentNode.querySelector("[data-sug]");if(c)c.style.display="";t.placeholder="or type your own";setTimeout(save,0)})}var nid=t.getAttribute("data-note"),tid=t.getAttribute("data-text");t.oninput=function(){if(nid)NT[nid]=t.value;setTimeout(save,0);if(tid){if(!PRE[tid])PRE[tid]=snap(tid);A[tid]=t.value;delete SK[tid];S.changed=true;var b=qp.querySelector("[data-send]");if(b)b.innerHTML=b.innerHTML.replace("Send Claude's picks","Send")}grow(t)};
   if(nid)t.addEventListener("paste",function(e){if(!canShot)return;var f=files(e.clipboardData);if(f.length){e.preventDefault();addShots(nid,f);thumbs()}})});
  [].forEach.call(qp.querySelectorAll("input[data-datein]"),function(inp){var did=inp.getAttribute("data-datein");function up(){if(!inp.value)return;var p=inp.value.split("-"),d=new Date(+p[0],+p[1]-1,+p[2]),t=new Date();t.setHours(0,0,0,0);if(!PRE[did])PRE[did]=snap(did);A[did]=dval(d,t);delete SK[did];S.changed=true;var l=qp.querySelector('[data-odl="'+did+'"]');if(l)l.textContent="📅 "+A[did]+" ✓";var lb=qp.querySelector('[data-odate="'+did+'"]');if(lb){lb.style.background=C5.ac[3];lb.style.color=C5.navy}[].forEach.call(qp.querySelectorAll('[data-date="'+did+'"]'),function(c,i){c.style.background=rgba5(C5.ac[i%4],.2);c.style.color=C5.ac[i%4]});var b=qp.querySelector("[data-send]");if(b)b.innerHTML=b.innerHTML.replace("Send Claude's picks","Send");setTimeout(save,0)}inp.onchange=up;inp.oninput=up;
   inp.addEventListener("click",function(e){e.stopPropagation();try{if(inp.showPicker){inp.showPicker();e.preventDefault()}}catch(x){if(!touch){inp.style.opacity="1";inp.style.background=C5.navy;inp.style.color=C5.ink;inp.style.padding="0 12px";try{inp.focus()}catch(y){}}}})});
  thumbs();fit()}
 function fade(node){var it=node.closest?node.closest("[data-item]"):null;if(!it){draw();return}it.style.opacity="0";setTimeout(draw,220)}
 function addShots(id,list){var imgs=[].slice.call(list||[]).filter(function(f){return f&&f.type&&f.type.indexOf("image/")===0});var all=Object.keys(SH).reduce(function(n,k){return n+SH[k].length},0);imgs=imgs.slice(0,Math.max(0,MAXSHOTS-all));SH[id]=(SH[id]||[]).concat(imgs.map(function(f,k){return f.name&&f.name!=="image.png"?f:new File([f],"screenshot-"+Date.now()+"-"+k+".png",{type:f.type})}))}
 function files(dt){try{return dt.files&&dt.files.length?[].slice.call(dt.files):[].slice.call(dt.items||[]).filter(function(x){return x.kind==="file"}).map(function(x){return x.getAsFile()}).filter(Boolean)}catch(e){return[]}}
 pick.onchange=function(){if(shotTarget){addShots(shotTarget,pick.files);thumbs()}pick.value=""};
 function byId(id){for(var i=0;i<ITEMS.length;i++)if(ITEMS[i].id===id)return ITEMS[i];return null}
 qp.addEventListener("click",function(e){try{tap(e)}catch(x){draw()}});
 function tap(e){var sbx=e.target.closest&&e.target.closest("[data-sugbox]");if(sbx&&!e.target.closest("[data-sug]")&&e.target.tagName!=="TEXTAREA"){var sta=sbx.querySelector("textarea");if(sta)sta.focus();return}var n=e.target.closest&&e.target.closest("[data-sug],[data-tuck],[data-arr],[data-sum],[data-showtop],[data-showq],[data-skipq],[data-ans],[data-pair],[data-scale],[data-date],[data-num],[data-nq],[data-ck],[data-rk],[data-done],[data-step],[data-skip],[data-skiprows],[data-copy],[data-clip],[data-send],[data-unsend],[data-back]");if(!n)return;var d=n.dataset;
  var aid=d.ans||d.pair||d.scale||d.date||d.num||d.nq||d.ck||d.rk||d.done||d.step||(d.sug&&d.sug.indexOf("t:")===0?d.sug.slice(2):null);var rid=aid||d.skip||null,pre=rid&&byId(rid)?snap(rid):null;if(aid&&SK[aid])delete SK[aid];
  if(d.back){back();return draw()}
  if(d.skip){var it8=byId(d.skip);if(!it8)return;delete A[it8.id];delete HID[it8.id];delete RK[it8.id];SK[it8.id]=true;S.changed=true;rec(rid,pre,true);return S.review?draw():fade(n)}
  if(d.skiprows!=null){F.keep.forEach(function(g){if(String(g.k)===d.skiprows)g.rows.forEach(function(o){S.tuck[o.id]=true})});return draw()}
  if(d.copy!=null){var ok=syncCopy(d.copy);if(d.url)go(d.copy.trim());n.textContent=ok?(d.url?"Opened ✓":"Copied ✓"):"⌘C";return}
  if(d.clip){shotTarget=d.clip;pick.click();return}
  if(d.sug){var sk=d.sug,sv=SUG[sk];DIS[sk]=false;if(sk.indexOf("t:")===0){var sid=sk.slice(2);A[sid]=sv;HID[sid]=true;S.changed=true;rec(rid,pre);n.style.background=C5.ac[3];n.style.color=C5.navy;return S.review?draw():fade(n)}NT[sk]=sv;return draw()}
  if(d.tuck){S.tuck[d.tuck]=true;return fade(n)}
  if(d.arr){S.open[d.arr]=!S.open[d.arr];return draw()}
  if(d.sum){S.sum=!S.sum;return draw()}
  if(d.showtop){S.tuck={};return draw()}
  if(d.showq){S.review=!S.review;return draw()}
  if(d.skipq){S.front=null;d.skipq.split(" ").forEach(function(id){var i=S.later.indexOf(id);if(i>=0)S.later.splice(i,1);S.later.push(id)});return draw()}
  if(d.ans){var it=byId(d.ans),q=it.q,o=q.options[+d.i];if(q.multi){var cur=Array.isArray(A[it.id])?A[it.id].slice():[],ix=+d.i,i=cur.indexOf(ix);if(i<0&&q.max&&cur.length>=q.max){S.maxed=it.id;return draw()}S.maxed=null;if(i>=0)cur.splice(i,1);else cur.push(ix);cur.sort(function(x,y){return x-y});A[it.id]=cur;S.changed=true;rec(rid,pre);return draw()}
   A[it.id]=o.label;S.changed=true;rec(rid,pre);if(S.review)return draw();n.style.background=q.code?(+d.i?C5.gold:C5.dim):C5.ac[+d.i%4];n.style.color=C5.navy;return fade(n)}
  if(d.pair){var it2=byId(d.pair),x=null;it2.q.items.forEach(function(y){if(y.id===d.pid)x=y});A[it2.id]=A[it2.id]||{};A[it2.id][x.id]=[x.a,x.b][+d.i];S.changed=true;rec(rid,pre);return isAns(it2)&&!S.review?fade(n):draw()}
  if(d.scale){A[d.scale]=d.i+" of 5";S.changed=true;rec(rid,pre);return S.review?draw():fade(n)}
  if(d.date){A[d.date]=d.v;HID[d.date]=true;S.changed=true;rec(rid,pre);return S.review?draw():fade(n)}
  if(d.num){var it3=byId(d.num),q3=it3.q,stp=q3.step||1,base=A[it3.id]!=null&&A[it3.id]!==""?parseFloat(A[it3.id]):(q3.pick!=null?q3.pick:(q3.min!=null?q3.min:0)),v=base+(+d.d)*stp;if(q3.min!=null&&v<q3.min)v=q3.min;if(q3.max!=null&&v>q3.max)v=q3.max;A[it3.id]=fmt5(v)+(q3.unit?" "+q3.unit:"");S.changed=true;rec(rid,pre);return draw()}
  if(d.nq){var it4=byId(d.nq);A[it4.id]=fmt5(+d.v)+(it4.q.unit?" "+it4.q.unit:"");S.changed=true;rec(rid,pre);return draw()}
  if(d.ck){var it5=byId(d.ck),cv=A[it5.id]||(it5.q.pick||[]).slice(),o5=it5.q.items[+d.i],j5=cv.indexOf(o5);if(j5>=0)cv.splice(j5,1);else cv.push(o5);cv.sort(function(a,b){return it5.q.items.indexOf(a)-it5.q.items.indexOf(b)});A[it5.id]=cv;S.changed=true;rec(rid,pre);return draw()}
  if(d.rk){var it6=byId(d.rk),rv=RK[it6.id]=RK[it6.id]||[],o6=it6.q.items[+d.i],j6=rv.indexOf(o6);if(j6>=0)rv.splice(j6,1);else rv.push(o6);A[it6.id]=rv.length?rv.map(function(x,j){return(j+1)+". "+x}).join(" > ")+(rv.length<it6.q.items.length?" (partial)":""):"";S.changed=true;rec(rid,pre);return draw()}
  if(d.done){var it7=byId(d.done);if(it7.q.kind==="check"&&!A[it7.id])A[it7.id]=(it7.q.pick||[]).slice();HID[d.done]=true;S.changed=true;rec(rid,pre);return fade(n)}
  if(d.step){A[d.step]=true;rec(rid,pre);n.style.background=C5.mint;n.style.color=C5.navy;return fade(n)}
  if(d.unsend){Object.keys(AUTON).forEach(function(k){delete NT[k]});AUTON={};S.auto.forEach(function(id){delete A[id];delete HID[id]});S.auto=[];S.sent=false;return draw()}
  if(d.send){send()}}
 function txt5(m){return txt4(m)}
 function fmt5(v){return String(Math.round(v*1e6)/1e6)}
 function pickAns(it){var q=it.q,a=A[it.id],k=q.kind;if(S.auto.indexOf(it.id)>=0)return true;if(k==="decide"||k==="do"){var ps=(q.options||[]).filter(function(o){return o.pick}).map(function(o){return o.label});if(!ps.length)return false;return q.multi?mlab(q,a)===ps.join("; "):a===ps[0]}if(k==="pair")return !!a&&q.items.every(function(x){return a[x.id]===x.pick});if(k==="number")return q.pick!=null&&a===fmt5(q.pick)+(q.unit?" "+q.unit:"");if(k==="scale")return q.pick!=null&&a===q.pick+" of 5";if(k==="check")return q.pick!=null&&JSON.stringify(a||q.pick)===JSON.stringify(q.pick);return false}
 function fillPicks(){S.auto=[];AUTON={};if(false)ITEMS.forEach(function(it){if(it.t!=="q"||isAns(it))return;var q=it.q,v=null;if(q.code)return;
   if(q.kind==="decide"){var ps=q.options.filter(function(o){return o.pick}).map(function(o){return o.label});if(!ps.length)return;v=q.multi?q.options.map(function(o,i){return o.pick?i:-1}).filter(function(i){return i>=0}):ps[0];if(q.multi)HID[it.id]=true}
   else if(q.kind==="pair"){v={};q.items.forEach(function(x){v[x.id]=(A[it.id]&&A[it.id][x.id])||x.pick})}
   else if(q.kind==="scale"&&q.pick!=null)v=q.pick+" of 5";else if(q.kind==="number"&&q.pick!=null){v=fmt5(q.pick)+(q.unit?" "+q.unit:"");HID[it.id]=true}
   else if(q.kind==="check"&&q.pick!=null){v=q.pick.slice();HID[it.id]=true}
   else if(q.kind==="text"&&sugOn("t:"+it.id))v=q.sug;
   if(v!=null){A[it.id]=v;it._auto=true;S.auto.push(it.id)}});Object.keys(SUG).forEach(function(k){var di=byId(k.slice(2));if(di&&isAns(di)&&pickAns(di)&&sugOn(k)){NT[k]=SUG[k];AUTON[k]=true}})}
 function ansText(it){var q=it.q,a=A[it.id],k=q.kind;if(k==="pair")return q.items.map(function(x){return x.text+": "+((a&&a[x.id])||"(skipped)")}).join("; ");if(k==="check"){if(!isAns(it))return "";return a&&a.length?"checked: "+a.join(", "):"none checked"}if(!isAns(it)&&k!=="text")return "";if(q.multi)return mlab(q,a);return a||""}
 function mlab(q,a){return(Array.isArray(a)?a:[]).map(function(i){return q.options[i]?q.options[i].label:""}).filter(Boolean).join("; ")}
 function transcript(extra){var L=["answers in · "+R.round+" · v"+VERSION+" · "+innerWidth+"w"+(R.file?" · from file":"")+repLine(REP)+(ND.length+BAD.length?" · not drawn: "+(ND.length+BAD.length):"")+(qp._clip?" · clipped: "+qp._clip:""),""],shotList=[];
  R.ideas.forEach(function(I,k){var its=ITEMS.filter(function(it){return it.k===k});if(!its.length)return;L.push(I._n+" "+I.t);var sts=its.filter(function(it){return it.t==="step"});sts.forEach(function(it){L.push("Step: "+it.x.s+": "+(A[it.id]?"done":(SK[it.id]?"skipped":"not done")))});
   its.filter(function(it){return it.t==="q"}).forEach(function(it){var a=ansText(it);L.push((it.q.code?"🔐 ":"Q: ")+it.q.q);L.push("Answer: "+(a||"(skipped)")+(S.auto.indexOf(it.id)>=0?" (Claude's pick)":(it.q.kind==="text"&&it.q.sug&&String(a).trim()===it.q.sug.trim()?" (Claude's draft)":"")));var qn=String(NT["q:"+it.id]||"").trim();if(qn)L.push("Note on this question: "+qn+(it.q.sug&&it.q.kind!=="text"&&qn===it.q.sug.trim()?(AUTON["q:"+it.id]?" (Claude's draft, untouched)":" (Claude's draft, tapped)"):""))});L.push("")});
  BAD.forEach(function(b){L.push("🔐 "+b.label+": not drawn ("+b.why+")")});ND.forEach(function(x){if(x.why!=="row"&&x.why!=="stray text")L.push("Not drawn: "+x.text.slice(0,120)+(x.why?" ("+x.why+")":""))});if(BAD.length||ND.length)L.push("");
  var nt=(NT._top||"").trim();if(nt)L.push("Note on what Claude did: "+nt);var nj=(NT._user||"").trim();if(nj)L.push("Note: "+nj);
  Object.keys(SH).forEach(function(id){var s=SH[id]||[];shotList=shotList.concat(s)});if(shotList.length)L.push("Screenshots: "+shotList.length);
  if(extra)L.push(extra);return{text:L.join("\n").trim(),shots:shotList}}
 function plain(t){try{sendPrompt(t)}catch(e){syncCopy(t)}}
 function send(){var wasChanged=S.changed;fillPicks();var n=ITEMS.filter(function(it){return isAns(it)&&S.auto.indexOf(it.id)<0}).length;
  S.words=!ITEMS.length?"note sent":(S.auto.length&&!wasChanged?"Claude's picks":(S.auto.length?n+" changed, rest Claude's picks":n+" answer"+(n===1?"":"s")));
  var T=transcript();S.sent=true;draw();
  if(!T.shots.length){plain(T.text);return}
  var form=document.querySelector("form.elicit"),fi=form&&form.querySelector("input[type=file]");
  if(!form||!fi){plain(transcript("(screenshots not sent: send form missing)").text);return}
  try{var dt=new DataTransfer();T.shots.forEach(function(f){dt.items.add(f)});fi.files=dt.files;fi.dispatchEvent(new Event("change",{bubbles:true}))}catch(e){plain(transcript("(screenshots not sent: "+(e&&e.message||e)+")").text);return}
  setTimeout(function(){var f2=document.querySelector("form.elicit")||form,ans=f2.querySelector("[data-name=answers]"),sub=f2.querySelector(".elicit-submit");if(!sub){plain(transcript("(screenshots not sent: no submit)").text);return}
   if(!ans){ans=el("textarea","elicit-textarea");ans.setAttribute("data-name","answers");ans.style.display="none";(f2.querySelector(".elicit-group")||f2).appendChild(ans)}ans.value=T.text;ans.dispatchEvent(new Event("input",{bubbles:true}));sub.click()},400)}
 if(canShot&&!FIN){["dragenter","dragover"].forEach(function(ev){qp.addEventListener(ev,function(e){e.preventDefault();qp.classList.add("drop")})});
  qp.addEventListener("dragleave",function(e){if(!qp.contains(e.relatedTarget))qp.classList.remove("drop")});
  qp.addEventListener("drop",function(e){e.preventDefault();qp.classList.remove("drop");var fs=e.dataTransfer&&e.dataTransfer.files;if(!fs||!fs.length)return;addShots("_user",fs);thumbs()})}
 function lines(e,pad){try{var cs=getComputedStyle(e),h=e.scrollHeight-(pad?(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0):0);return Math.round(h/(parseFloat(cs.fontSize)*1.3))}catch(x){return 0}}
 function fit(){var c=0;[].forEach.call(qp.querySelectorAll(".rt"),function(r){r.classList.remove("t2");var s=r.lastElementChild;if(s&&lines(s)>2){r.classList.add("t2");lines(s)}});
  [].forEach.call(qp.querySelectorAll(".qt"),function(q){q.classList.remove("t2");if(lines(q,true)>2){q.classList.add("t2");lines(q,true)}});
  [].forEach.call(qp.querySelectorAll(".rt.cl>span:last-child"),function(s){if(s.scrollHeight>s.clientHeight+2)c++});qp._clip=c}
 var rz=null;try{addEventListener("resize",function(){clearTimeout(rz);rz=setTimeout(fit,150)})}catch(x){}
 ITEMS.slice().forEach(function(it){try{itemH(it,false)}catch(e){ITEMS.splice(ITEMS.indexOf(it),1);if(it.q&&it.q.code)BAD.push({label:String(it.q.q||"approval"),why:"could not be drawn"});else ND.push({text:String((it.q&&it.q.q)||(it.x&&it.x.s)||"").slice(0,300),why:"could not be drawn"})}});
 F.keep.forEach(function(g){g.rows=g.rows.filter(rowOk)});F.keep=F.keep.filter(function(g){return g.rows.length});F.done=F.done.filter(rowOk);
 function rowOk(o){try{split(o.r.s);detH(o.r.m);col(o.r.s);return true}catch(e){ND.push({text:String(o.r&&o.r.s||"").slice(0,300),why:"row"});return false}}
 load();host.appendChild(qp);try{draw0()}catch(e){try{host.removeChild(qp)}catch(x){}throw e}
 [].slice.call(host.childNodes).forEach(function(c){if(c!==qp&&!(c.classList&&c.classList.contains("q5")))host.removeChild(c)});
 try{fit()}catch(x){}try{document.fonts.ready.then(fit)}catch(x){}
 qp._A=A;qp._NT=NT;qp._transcript=transcript;qp._rep=REP;qp._nd=ND;qp._bad=BAD;qp._S=S;qp._draw=draw;qp._items=ITEMS;window.QP.last=qp;return qp}
function repLine(REP){var k=Object.keys(REP).filter(function(x){return REP[x]>0});return k.length?" · repaired: "+k.map(function(x){return x+" "+REP[x]}).join(", "):""}
function hostOf(id){var h=document.getElementById(typeof id==="string"&&id?id:"qp-root");if(!h){h=el("div");h.id="qp-root";var s=document.getElementById("qp");if(s&&s.parentNode)s.parentNode.insertBefore(h,s);else(document.body||document.documentElement).appendChild(h)}return h}
function tellBox(round,reason){var b=el("div"),t="page broken · "+(round||"unknown")+" · "+reason;
 b.innerHTML='<div style="font-size:19px;line-height:1.3;padding:0 0 6px">Page data could not be read</div><div style="font-size:15px;color:'+C5.sub+';padding:0 0 12px;overflow-wrap:anywhere">'+esc5(reason)+'</div><div role="button" tabindex="0" data-tell="1" style="'+TB5+'gap:10px;white-space:nowrap;font-size:17px;padding:11px 18px;border-radius:999px;border:1px solid '+C5.dim+';color:'+C5.ink+'">Tell Claude ↗</div><div style="height:16px"></div>';
 b.querySelector("[data-tell]").addEventListener("click",function(){try{sendPrompt(t)}catch(e){syncCopy(t)}this.textContent="Sent ✓"});return b}
function broken(round,reason,root){try{if(!document.getElementById("qp5-css")){var st=el("style");st.id="qp5-css";st.textContent=CSS5;(document.head||document.documentElement).appendChild(st)}
 var host=hostOf(root),b=el("div","q5 qpx");b.setAttribute("lang","en");b.appendChild(tellBox(round,reason));host.appendChild(b);
 [].slice.call(host.childNodes).forEach(function(c){if(c!==b&&!(c.classList&&c.classList.contains("q5")))host.removeChild(c)});b._broken=reason;window.QP.last=b;return b}catch(e){return null}}
function roundOf(v){try{if(v&&typeof v==="object"&&typeof v.round==="string")return v.round;var m=/\b[a-z]{2,8}\d{1,4}\b/.exec(String(v));return m?m[0]:"unknown"}catch(e){return "unknown"}}
var MOUNTED=false,RESCUED=null,ME=null;try{ME=document.currentScript||null}catch(e){}
function mount(input,how,cut){
 MOUNTED=true;try{if(RESCUED&&RESCUED.parentNode)RESCUED.parentNode.removeChild(RESCUED)}catch(e){}RESCUED=null;
 var P=null,root=input&&typeof input==="object"&&typeof input.root==="string"?input.root:null,qp;
 try{P=plan(input,cut,how==="auto"&&!cut);if(P.fail)return broken(P.round,P.fail,root);qp=mountCore(P);if(how==="rescue")RESCUED=qp;return qp}
 catch(e){return broken((P&&P.round)||roundOf(input),"the page could not be drawn: "+String((e&&e.message)||e).slice(0,120),root)}}
function dataTag(){var s=null;try{s=document.getElementById("qp");if(s&&!/^script$/i.test(s.tagName))s=null;
 if(!s){var l=document.querySelectorAll('script[type="text/plain"],script[type="application/json"]');if(l.length===1)s=l[0]}}catch(e){}return s}
function tagText(s){var t=s.textContent||"",x="",n=s.nextSibling,loose=[],h=t.replace(/^\s+/,""),odd;
 if(h[0]==="{"||h[0]==="["){try{JSON.parse(h);return{text:t,cut:false}}catch(e){}}
 else{odd=0;h.split("\n").forEach(function(l){l=l.trim();if(FENCE.test(l)&&!oneLine(l))odd++});if(odd%2===0)return{text:t,cut:false}}
 while(n&&n!==ME&&!(n.nodeType===1&&/^script$/i.test(n.tagName)&&n.getAttribute("src"))){
  if(!(n.nodeType===1&&(/^(script|style)$/i.test(n.tagName)||n.id==="qp-root"||n.id==="qp-stash"||(n.querySelector&&n.querySelector("#qp-root,.q5,form.elicit"))))){x+=n.textContent||"";loose.push(n)}n=n.nextSibling}
 if(!x.trim()||!n)return{text:t,cut:false};
 loose.forEach(function(j){if(j.parentNode)j.parentNode.removeChild(j)});return{text:t+"</script>"+x,cut:true}}
function auto(){if(MOUNTED)return true;var s=dataTag();if(!s)return false;var t=tagText(s);mount(t.text,"auto",t.cut);return true}
function rescue(){if(MOUNTED)return;var l=document.querySelectorAll("script:not([src])"),i,t,k;
 for(i=0;i<l.length;i++){t=l[i].textContent||"";k=t.indexOf("QP.mount(");if(k>=0&&l[i]!==ME&&t.indexOf("window.QP=")<0){mount(t.slice(k),"rescue");return}}}
function late(){try{if(!auto())rescue()}catch(e){}}
window.QP={mount:function(r){return mount(r)},prep:prep,check:check,stamp:stamp,fold:fold,summary:summary,keepRow:keepRow,version:VERSION,read:readText,plan:plan,last:null};
try{if(typeof window.addEventListener==="function"&&typeof document.querySelectorAll==="function"){
 window.addEventListener("error",function(){if(!MOUNTED)setTimeout(late,0)},true);
 if(!auto()){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(late,0)});
  window.addEventListener("load",function(){setTimeout(late,0)});[300,1200,3000].forEach(function(ms){setTimeout(late,ms)})}}}catch(e){}
})();
