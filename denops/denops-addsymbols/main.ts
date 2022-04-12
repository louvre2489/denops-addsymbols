import { Denops } from "https://deno.land/x/denops_std@v3.3.0/mod.ts";
import * as fn from "https://deno.land/x/denops_std@v3.3.0/function/mod.ts";
import { decorate } from "https://deno.land/x/denops_std@v3.3.0/buffer/mod.ts";

export async function main(denops: Denops): Promise<void> {

  // 対象の単語の色を変更する
  const hiColorKey = "AddSymbols";
  const hiBgColor = 186;
  const hiFgColor = 16;

  // ハイライト持続期間(ms)
  const highlightTime = 1000;

  denops.dispatcher = {
    async addSymbol(...symbols: Array<unknown>): Promise<void> {

      await denops.cmd(`highlight ${hiColorKey} ctermbg = ${hiBgColor} ctermfg = ${hiFgColor}`);

      // 記号
      let bef = (symbols as Array<String>)[0];
      let aft = (symbols as Array<String>)[1];

      // カーソル位置
      let line = (await denops.eval(`line(".")`)) as number;
      let col = ((await denops.eval(`col(".")`)) as number);

      // 記号を付ける単語
      let cword = (await denops.eval(`expand("<cword>")`)) as String;

      // いったん単語の末尾に移動する
      await denops.cmd(`normal e`);
      let end = ((await denops.eval(`col(".")`)) as number) + 1;

      // ハイライトする文字数
      let len = end - col;

      denops.cmd(`substitute/${cword}/${bef}${cword}${aft}/`);

      const bufnr = await fn.bufnr(denops) as number;
      await decorate(denops, bufnr, [
        {
          line: line,
          column: col + 1,
          length: len,
          highlight: hiColorKey,
        },
      ]);

      // カーソル位置を元に戻す
      await denops.eval(`cursor(${line}, ${col})`);

      // 指定時間後にハイライトを削除する
      setTimeout(() => {
        denops.eval(`nvim_buf_clear_namespace(${bufnr}, -1, ${line - 1}, ${line})`);
      }, highlightTime);
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
