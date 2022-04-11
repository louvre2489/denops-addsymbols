import { Denops } from "https://deno.land/x/denops_std@v3.3.0/mod.ts";
import * as fn from "https://deno.land/x/denops_std@v3.3.0/function/mod.ts";
import { decorate } from "https://deno.land/x/denops_std@v3.3.0/buffer/mod.ts";

export async function main(denops: Denops): Promise<void> {

  const hiColorKey = "AddSymbols";
  const hiColor = "lightgrey";

  denops.dispatcher = {
    async addSymbol(...symbols: Array<unknown>): Promise<void> {

//      await denops.cmd(`highlight ${hiColorKey} ctermbg = ${hiColor}`);
      // 記号
      let bef = (symbols as Array<String>)[0];
      let aft = (symbols as Array<String>)[1];

      // ハイライトする位置
      let line = (await denops.eval(`line(".")`)) as number;
      let col = (await denops.eval(`col(".")`)) as number;

      // 記号を付ける単語
      let cword = (await denops.eval(`expand("<cword>")`)) as String;
      // 単語の文字数
      let len = cword.length;

      denops.cmd(`substitute/${cword}/${bef}${cword}${aft}/`);

      const bufnr = await fn.bufnr(denops) as number;
      await decorate(denops, bufnr, [
        {
          line: line,
          column: col,
          length: len,
          highlight: hiColorKey,
        },
      ]);
    },
  };

  // シングルクォート
  await denops.cmd(
    `command! DSQ call denops#request('${denops.name}', 'addSymbol', ['''', ''''])`,
  );
  // ダブルクォート
  await denops.cmd(
    `command! DDQ call denops#request('${denops.name}', 'addSymbol', ['"', '"'])`,
  );
  // {}
  await denops.cmd(
    `command! DB call denops#request('${denops.name}', 'addSymbol', ['{', '}'])`,
  );
  // []
  await denops.cmd(
    `command! DS call denops#request('${denops.name}', 'addSymbol', ['[', ']'])`,
  );
  // <>
  await denops.cmd(
    `command! DA call denops#request('${denops.name}', 'addSymbol', ['<', '>'])`,
  );
  // ()
  await denops.cmd(
    `command! DP call denops#request('${denops.name}', 'addSymbol', ['(', ')'])`,
  );
}
