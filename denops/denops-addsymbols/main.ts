import { Denops } from "https://deno.land/x/denops_std@v3.3.0/mod.ts";

export async function main(denops:Denops): Promise<void> {
  denops.dispatcher = {
    async addSymbol(... symbols: Array<unknown>): Promise<void> {

      let bef = (symbols as Array<String>)[0];
      let aft = (symbols as Array<String>)[1];

      let cword = (await denops.eval(`expand("<cword>")`)) as String;
      denops.cmd(`substitute/${cword}/${bef}${cword}${aft}/`);
    },
  };

  // シングルクォート
  await denops.cmd(`command! DSQ call denops#request('${denops.name}', 'addSymbol', ['''', ''''])`);
  // ダブルクォート
  await denops.cmd(`command! DDQ call denops#request('${denops.name}', 'addSymbol', ['"', '"'])`);
  // {}
  await denops.cmd(`command! DB call denops#request('${denops.name}', 'addSymbol', ['{', '}'])`);
  // []
  await denops.cmd(`command! DS call denops#request('${denops.name}', 'addSymbol', ['[', ']'])`);
  // <>
  await denops.cmd(`command! DA call denops#request('${denops.name}', 'addSymbol', ['<', '>'])`);
  // ()
  await denops.cmd(`command! DP call denops#request('${denops.name}', 'addSymbol', ['(', ')'])`);
};
