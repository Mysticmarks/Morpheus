"use strict";exports.id=730,exports.ids=[730],exports.modules={6730:(t,e,a)=>{async function n(t,e){t.internalDocumentIDStore.load(t,e.internalDocumentIDStore),t.data.index=await t.index.load(t.internalDocumentIDStore,e.index),t.data.docs=await t.documentsStore.load(t.internalDocumentIDStore,e.docs),t.data.sorting=await t.sorter.load(t.internalDocumentIDStore,e.sorting),t.tokenizer.language=e.language}async function o(t){return{internalDocumentIDStore:t.internalDocumentIDStore.save(t.internalDocumentIDStore),index:await t.index.save(t.data.index),docs:await t.documentsStore.save(t.data.docs),sorting:await t.sorter.save(t.data.sorting),language:t.tokenizer.language}}a.r(e),a.d(e,{load:()=>n,save:()=>o})}};
//# sourceMappingURL=730.index.js.map