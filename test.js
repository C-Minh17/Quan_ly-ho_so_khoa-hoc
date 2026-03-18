const html = `<p><span style="font-weight: 400;">experiencing true British 1 []</span></p>
<p>Festival start date: July 2 []&nbsp;</p>
<p>Main location: 3 [] Park</p>`;
const regex = /(\d+)(?:\s|&nbsp;)*\.?(?:\s|&nbsp;)*\[(?:&nbsp;|\s)*\]/g;
console.log("Original:");
console.log(html);
console.log("\nReplaced:");
console.log(html.replace(regex, '<span class="gap-fill-placeholder" data-qnum="$1"></span>'));
