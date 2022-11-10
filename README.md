This is a reproduction of a React Query V4 bug that throws error `Error: No QueryClient set, use QueryClientProvider to set one` when using queries defined in a seperate package which is a peer dependency.

Steps to reproduce:

- `cd repro-rq`
- run `npm i`
- run `npm run dev`
- uncomment line 16 in App.tsx
- witness error in console

Extra info:
The package that is being imported that causes this error is defined in sep-pkg director in this repo. It's generated using the `npm run gen` command then deployed to npm, then imported to the other dir. The output of the npm run gen command is in the `out` dir, that is what is deployed.
