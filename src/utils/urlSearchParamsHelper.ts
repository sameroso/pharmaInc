export class UrlSearchParamsHelper<
	T extends Record<string, string> = Record<string, string>
> {
	urlSearchParams: URLSearchParams;

	constructor(queryUrl = "") {
		this.urlSearchParams = new URLSearchParams(queryUrl);
	}

	static create<K extends Record<string, string> = Record<string, string>>(
		queryUrl = ""
	): UrlSearchParamsHelper<K> {
		return new UrlSearchParamsHelper<K>(queryUrl);
	}

	/**
	 * @description                       [add single param to url search params]
	 * @param   {string}        key       [the key of the param to add]
	 * @param   {string}        value     [the value the param to add]
	 *
	 * @return  {string}                  [Url search params string modified]
	 *
	 * @example
	 *  const urlSearchParamsWithAddedParam = UrlSearchParamsHelper
	 *  .create('?key1=value1')
	 *  .addParam({ key:"key2", value:"value2"})
	 *  .urlSearchParamsString
	 *
	 *
	 *  console.log(urlSearchParamsWithAddedParam) => "key1=value1&key2=value2"
	 *
	 *  --- Typescript ---
	 *
	 *   const urlSearchParamsWithAddedParam = UrlSearchParamsHelper
	 *  .create<{ key1:string ,key2?: string }>('?key1=value1')
	 *  .addParam({ key:"key2", value:"value2"})
	 *  .urlSearchParamsString
	 *
	 *
	 *  console.log(urlSearchParamsWithAddedParam) => "key1=value1&key2=value2"
	 *
	 */
	addParam({ key, value }: { key: string; value: string }): UrlSearchParamsHelper<T> {
		this.urlSearchParams.append(key, value);
		return this;
	}
	/**
	 * @description                          [add param list to url search params]
	 *
	 * @param   {string}         key         [the key of the param to add]
	 * @param   {string}         value       [the value the param to add]
	 *
	 * @return  {string}                     [Url search params string modified]
	 *
	 * @example
	 *  const urlSearchParamsWithAddedParamList = UrlSearchParamsHelper
	 * .create('?key1=value1')
	 * .addParamList([{ key:"key2", value:"value2"},{ key:"key3", value:"value3"}])
	 * .urlSearchParamsString
	 *
	 *  console.log(urlSearchParamsWithAddedParamList) => "key1=value1&key2=value2&key3=value3"
	 *
	 * --- Typescript ---
	 *
	 *  const urlSearchParamsWithAddedParamList = UrlSearchParamsHelper
	 * .create<{ key1:string, key2?: string, key3:string  }>('?key1=value1')
	 * .addParamList([{ key:"key2", value:"value2"},{ key:"key3", value:"value3"}])
	 * .urlSearchParamsString
	 *
	 *  console.log(urlSearchParamsWithAddedParamList) => "key1=value1&key2=value2&key3=value3"
	 */

	addParamList(paramsList: { key: string; value: string }[]): UrlSearchParamsHelper<T> {
		paramsList.forEach(({ key, value }) => {
			this.urlSearchParams.append(key as string, value);
		});
		return this;
	}

	/**
	 * @description           [remove specific param]
	 *
	 * @param   {string}  key  [param key wanted to remove]
	 *
	 * @return  {string}      [Url search params string modified]
	 *
	 * @example
	 *  const urlSearchParamsWithRemovedParam = UrlSearchParamsHelper
	 * .create('?key1=value1&key2=value2&key3=value3&key4=value4')
	 * .removeParam("key2")
	 * .urlSearchParamsString
	 *
	 *  console.log(urlSearchParamsWithRemovedParam) => "key1=value1&key3=value3&key4=value4"
	 *
	 *  --- Typescript ---
	 *
	 * const urlSearchParamsWithRemovedParam = UrlSearchParamsHelper
	 * .create<{ key1:string key2?string, key3:string, key4:string }>('?key1=value1&key2=value2&key3=value3&key4=value4')
	 * .removeParam("key2")
	 * .urlSearchParamsString
	 *
	 *  console.log(urlSearchParamsWithRemovedParam) => "key1=value1&key3=value3&key4=value4"
	 *
	 */

	removeParam(key: keyof T): UrlSearchParamsHelper<T> {
		this.urlSearchParams.delete(key as string);
		return this;
	}

	/**
	 * @description                               [remove params list specified by an array of strings representing the key]
	 *
	 * @param   { key:string[] }    paramsList        [array of strings representing the keys wanted to remove]
	 *
	 * @return  {string}                        [Url search params string modified]
	 *
	 * @example
	 *  const urlSearchParamsWithRemovedParamList = UrlSearchParamsHelper
	 *  .create('?key1=value1&key2=value2&key3=value3&key4=value4')
	 *  .removeParamList(["key2", "key3"])
	 *  .urlSearchParamsString
	 *
	 *  console.log(urlSearchParamsWithRemovedParamList) => "key1=value1&key4=value4"
	 *
	 *  --- Typescript ---
	 *
	 *  const urlSearchParamsWithRemovedParamList = UrlSearchParamsHelper
	 *  .create<{ key1:string key2?string, key3?:string, key4?:string }>('?key1=value1&key2=value2&key3=value3&key4=value4')
	 *  .removeParamList(["key2", "key3"])
	 *  .urlSearchParamsString
	 *
	 *  console.log(urlSearchParamsWithRemovedParamList) => "key1=value1&key4=value4"
	 *
	 *
	 */

	removeParamList(paramsList: (keyof T)[]): UrlSearchParamsHelper<T> {
		paramsList.forEach((key) => {
			this.urlSearchParams.delete(key as string);
		});
		return this;
	}
	/**
	 * @description                                  [if param exists it replaces the param, if it does not exists it adds param]
	 *
	 * @param   {string}                      key    [param key wanted to to add or replace]
	 * @param   {string}                      value  [param value wanted to to add or replace]
	 *
	 * @return  {string}                             [Url search params string modified]
	 *
	 * @example
	 *  const urlSearchParamsWithAddedOrReplacedParam = UrlSearchParamsHelper
	 * .create('?key1=value1&key2=value2')
	 * .addOrReplaceParam({key:"key2", value:"replacedValue2"})
	 * .urlSearchParamsString
	 *
	 *  console.log(urlSearchParamsWithAddedOrReplacedParam) => "key1=value1&key2=replacedValue2"
	 *
	 * --- Typescript ---
	 *
	 * const urlSearchParamsWithAddedOrReplacedParam = UrlSearchParamsHelper
	 * .create<{ key1:string, key2:string }>('?key1=value1&key2=value2')
	 * .addOrReplaceParam({key:"key2", value:"replacedValue2"})
	 * .urlSearchParamsString
	 *
	 *  console.log(urlSearchParamsWithAddedOrReplacedParam) => "key1=value1&key2=replacedValue2"
	 */

	addOrReplaceParam({
		key,
		value,
	}: {
		key: keyof T;
		value: string;
	}): UrlSearchParamsHelper<T> {
		this.urlSearchParams.set(key as string, value);
		return this;
	}

	/**
	 * @description                                                [if param exists it replaces the param, if it does not exists it adds param]
	 *
	 * @param   {{ key:string; value:string }[]}       paramsList  [paramsList description]
	 *
	 * @return  {string}                                           [Url search params string modified]
	 *
	 * @example
	 *  const urlSearchParamWithAddedAndReplacedParam = UrlSearchParamsHelper
	 *  .create('?key1=value1&key2=value2')
	 *  .addOrReplaceParamList([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
	 *  .urlSearchParamsString
	 *
	 *
	 *  console.log(urlSearchParamWithAddedAndReplacedParam) => "key1=value1&key2=replacedValue2&key3=addedValue3"
	 *
	 * --- Typescript ---
	 *
	 *  const urlSearchParamWithAddedAndReplacedParam = UrlSearchParamsHelper
	 *  .create<{ key1:string, key2:string, key3:string }>('?key1=value1&key2=value2')
	 *  .addOrReplaceParamList([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
	 *  .urlSearchParamsString
	 *
	 *
	 *  console.log(urlSearchParamWithAddedAndReplacedParam) => "key1=value1&key2=replacedValue2&key3=addedValue3"
	 *
	 */

	addOrReplaceParamList(
		paramsList?: { key: string; value: string }[]
	): UrlSearchParamsHelper<T> {
		if (!paramsList || paramsList.length === 0) {
			return this;
		}

		paramsList.forEach(({ key, value }) => {
			this.urlSearchParams.set(key as string, value);
		});
		return this;
	}

	/**
	 * @description                                                [ Replace Url Search params string ]
	 *
	 * @param   {string}       urlSearchParamsString  				[string to be replaced in url search params string]
	 *
	 * @return  {string}                                           [Url search params string modified]
	 *
	 * @example
	 *  const urlSearchParamWithAddedAndReplacedParam = UrlSearchParamsHelper
	 *  .create('?key1=value1&key2=value2')
	 *  .addOrReplaceParamList([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
	 * 	.replaceUrlSearchParams("?key1=value1")
	 *  .urlSearchParamsString
	 *
	 *
	 *  console.log(urlSearchParamWithAddedAndReplacedParam) => "?key1=value1"
	 *
	 * --- Typescript ---
	 *
	 *  const urlSearchParamWithAddedAndReplacedParam = UrlSearchParamsHelper
	 *  .create<{ key1:string, key2:string, key3:string }>('?key1=value1&key2=value2')
	 *  .addOrReplaceParamList([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
	 * 	.replaceUrlSearchParams("?key1=value1")
	 *  .urlSearchParamsString
	 *
	 *
	 *  console.log(urlSearchParamWithAddedAndReplacedParam) => "?key1=value1"
	 *
	 */

	replaceUrlSearchParams(urlSearchParamsString = ""): UrlSearchParamsHelper<T> {
		this.urlSearchParams = new URLSearchParams(urlSearchParamsString);

		return this;
	}

	/**
	 * @description            [get specific param on url search params]
	 *
	 * @param   {string}  key  [key of value wanted to get]
	 *
	 * @return  {string}       [Url search params string modified]
	 *
	 * @example
	 *  const param = UrlSearchParamsHelper
	 *  .create('?key1=value1&key2=value2')
	 *  .getParam("key2")
	 *
	 *   console.log(param) => "value2"
	 *
	 * --- Typescript ---
	 *
	 * const param = UrlSearchParamsHelper
	 *  .create<{ key1:string, key2:string }>('?key1=value1&key2=value2')
	 *  .getParam("key2")
	 *
	 *   console.log(param) => "value2"
	 *
	 */

	getParam(key: keyof T): string | null {
		return this.urlSearchParams.get(key as string);
	}

	/**
	 * @description                              [get param list on url search params]
	 *
	 * @param   {string[]}            keys       [Array of values wanted to get params]
	 *
	 * @return  {string}                          [object containing param values]
	 * @example
	 *  const params = UrlSearchParamsHelper
	 * .create('?key1=value1&key2=value2&key3=value3')
	 * .getParamList(["key2","key3"])
	 *
	 *  console.log(params) => { key2:"value2", key3:"value3"};
	 *
	 * --- Typescript ---
	 *
	 *  const params = UrlSearchParamsHelper
	 * .create<{ key1:string, key2:string, key3:string }>('?key1=value1&key2=value2&key3=value3')
	 * .getParamList(["key2","key3"])
	 *
	 *  console.log(params) => { key2:"value2", key3:"value3"};
	 *
	 */

	getParamList(keys: Array<keyof T>): Record<keyof T, string | null> {
		return keys.reduce((acc, key) => {
			return { ...acc, [key]: this.urlSearchParams.get(key as string) };
		}, {}) as Record<keyof T, string | null>;
	}

	/**
	 * @description                                                   [get all params on url search params]
	 *
	 *
	 * @return  {Record<string, string>}                              [object containing all param values]
	 *
	 *  @example
	 *  const params = UrlSearchParamsHelper
	 *  .create('?key1=value1&key2=value2&key3=value3')
	 *  .allParams
	 *
	 *  console.log(params) => { key1:"value1", key2:"value2", key3:"value3" };
	 *
	 *  --- Typescript ---
	 *
	 * const params = UrlSearchParamsHelper
	 *  .create<{ key1:string, key2:string, key3:string }>('?key1=value1&key2=value2&key3=value3')
	 *  .allParams
	 *
	 *  console.log(params) => { key1:"value1", key2:"value2", key3:"value3" };
	 *
	 */

	get allParams(): Record<keyof T, string> | Record<string, never> {
		const entries = this.urlSearchParams.entries();
		let entriesValues = entries.next();
		const params: Record<string, string> = !entriesValues.done
			? {
					[entriesValues?.value?.[0]]: entriesValues.value?.[1],
			  }
			: {};
		while (!entriesValues.done && entriesValues.value) {
			params[entriesValues?.value?.[0]] = entriesValues?.value?.[1];
			entriesValues = entries.next();
		}
		return params as Record<keyof T, string>;
	}
	/**
	 * @description        [get Url search params]
	 *
	 * @return  {string}  [url search params]
	 *
	 * @example
	 *  const queryParamUrl = UrlSearchParamsHelper
	 *  .create('?key1=value1&key2=value2&key3=value3')
	 *  .urlSearchParamsString
	 *
	 *
	 *  console.log(queryParamUrl) => "key1=value1&key2=value2&key3=value3";
	 *
	 *  --- Typescript ---
	 *
	 *  const queryParamUrl = UrlSearchParamsHelper
	 *  .create<{ key1:string, key2:string, key3:string }>('?key1=value1&key2=value2&key3=value3')
	 *  .urlSearchParamsString
	 *
	 *
	 *  console.log(queryParamUrl) => "key1=value1&key2=value2&key3=value3";
	 *
	 */

	get urlSearchParamsString(): string {
		return this.urlSearchParams.toString();
	}
}