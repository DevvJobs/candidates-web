<template>
  <div class="cv-upload">
    <div id="cv-upload-content">
      <file-upload
        id="cv-upload-form"
        ref="upload"
        :drop="true"
        :drop-directory="false"
        :multiple="false"
        @input-file="inputFile"
        @input-filter="inputFilter">
        <p>Please drop your PDF file here or click to upload one</p>
      </file-upload>
    </div>
  </div>
</template>

<script>
// NOTE:
//
// The VueUploadComponent documentation can be found here:
//
// https://lian-yue.github.io/vue-upload-component/#/en/documents
//
// --- 2018-03-12 - lilsweetcaligula
//
import VueUploadComponent from 'vue-upload-component';

import _ from 'lodash';
import path from 'path';

// NOTE:
//
// Importing 'pdfjs-dist/webpack' will configure the worker for us.
//
// If you want to configure one yourself, then import 'pdfjs-dist',
// copy the worker from  ./node_modules/pdfjs-dist/build/pdf.worker.js
// to the 'static' folder and set pdfJs.GlobalWorkerOptions.workerSrc
// like this:
//
// ```
// pdfJs.GlobalWorkerOptions.workerSrc = './../../../../static/pdf.worker.js';
// ```
//
// --- 2018-03-12 - lilsweetcaligula
//
import pdfJs from 'pdfjs-dist/webpack';

const readPdfPagesContent = async (...args) => {
  const pdf = await pdfJs.getDocument(...args);

  const pagePromises = _.range(1, pdf.numPages + 1).map(pageNum => {
    return pdf.getPage(pageNum);
  });

  const pages = await Promise.all(pagePromises);

  const contentPromises = pages.map(page => {
    return page.getTextContent({ normalizeWhitespace: true });
  });

  const contents = await Promise.all(contentPromises);

  const pagesContent = contents.map(content => {
    // NOTE:
    //
    // Concatenating strings like that can actually be a performance
    // bottleneck. So if the upload ever needs to be optimized, this
    // may be a good place to start.
    //
    // --- 2018-03-13 - lilsweetcaligula
    //
    const pageText = content.items
      .reduce((acc, item) => acc + item.str, '');

    return pageText;
  });

  pdf.destroy();

  return pagesContent;
};

// TODO:
//
// 1. Limit the maximum size of the file allowed to be uploaded.
//    This can be done with the :size prop of the file-upload
//    component. Please see the documentation for details:
//
//    https://lian-yue.github.io/vue-upload-component/#/en/documents#options-props-size
//
// 2. Currently it is the inputFilter method that validates that
//    the uploaded file has a '.pdf' extension. This is rather
//    unwieldy, and can be replaced with the :extensions prop of
//    the file-upload component. Please see the documentation for
//    details:
//
//    https://lian-yue.github.io/vue-upload-component/#/en/documents#options-props-extensions
//
// --- 2018-03-13 - lilsweetcaligula
//
export default {
  components: {
    FileUpload: VueUploadComponent
  },
  methods: {
    inputFile (newFileWrapper, prevFileWrapper) {
      if (!newFileWrapper) return;

      const fileReader = new FileReader();

      // TODO:
      //
      // FileReader may additionally raise the `error` and `abort` events,
      // that must be handled. 
      //
      // --- 2018-03-13 - lilsweetcaligula
      //
      fileReader.addEventListener('loadend', async () => {
        const pagesContent = await readPdfPagesContent({
          data: fileReader.result
        });

        pagesContent.forEach((text, pageNum) => {
          console.log('#page #%d\n%s', pageNum, text);
        });

        alert('File upload successful.' +
          ' Please check your console for details.');
      });

      const { file } = newFileWrapper;

      fileReader.readAsArrayBuffer(file);
    },

    inputFilter (newFileWrapper, prevFileWrapper, onPrevent) {
      const { name } = newFileWrapper;
      const ext = path.extname(name);

      if (ext === '.pdf') return;

      alert('Please select a .pdf file');

      onPrevent();
    }
  }
};
</script>

<style lang="postcss" scoped>
  #cv-upload-form {
    display: block;
    padding: 50px;
    text-align: center;
    height: 1024px;
  }
</style>
