# Rellotge Català - Instruccions del Proxy d'IA

Aquesta aplicació utilitza un **proxy de Google Apps Script (GAS)** per comunicar-se de manera segura amb l'API de Gemini. Aquest mètode protegeix la teva clau d'API, evitant que quedi exposada al públic a GitHub Pages.

Segueix aquests passos per configurar el teu propi proxy. És un procés gratuït i només l'has de fer una vegada.

## Pas 1: Crea el Projecte de Google Apps Script

1.  Ves a [script.google.com](https://script.google.com).
2.  Fes clic a "**Nou projecte**" a la cantonada superior esquerra.

## Pas 2: Afegeix el Codi del Proxy

1.  A l'editor, esborra tot el contingut del fitxer `Code.gs`.
2.  Copia tot el contingut del fitxer `Code.gs` que es troba en aquest projecte i enganxa'l a l'editor de Google Apps Script.

## Pas 3: Guarda la teva Clau d'API de Forma Segura

1.  Necessitaràs una clau d'API de Gemini. La pots obtenir gratuïtament a [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  A l'editor d'Apps Script, fes clic a la icona de la roda dentada (⚙️) a la barra lateral esquerra ("**Configuració del projecte**").
3.  A la secció "**Propietats de l'script**", fes clic a "**Afegeix una propietat de l'script**".
4.  Al camp "**Propietat**", escriu exactament: `GEMINI_API_KEY`.
5.  Al camp "**Valor**", enganxa la teva clau d'API de Gemini.
6.  Fes clic a "**Desa les propietats de l'script**".

## Pas 4: Desplega l'Script com a Aplicació Web

1.  A la cantonada superior dreta, fes clic al botó blau "**Implementa**" i selecciona "**Nova implementació**".
2.  Fes clic a la icona de la roda dentada (⚙️) al costat de "Selecciona el tipus" i tria "**Aplicació web**".
3.  A la configuració:
    *   **Descripció:** Posa un nom, per exemple "Proxy Rellotge Català".
    *   **Executa com a:** Deixa "Jo (el teu correu)".
    *   **Qui té accés:** Canvia-ho a "**Qualsevol usuari**". **Això és crucial** perquè la teva app de GitHub Pages pugui accedir-hi.
4.  Fes clic a "**Implementa**".
5.  **Autoritza els permisos**:
    *   Apareixerà una finestra per autoritzar l'script. Fes clic a "**Autoritza l'accés**".
    *   Selecciona el teu compte de Google.
    *   Pot ser que vegis un avís de "Google no ha verificat aquesta aplicació". Fes clic a "**Configuració avançada**" i després a "**Vés a (nom del projecte) (no segur)**".
    *   Finalment, fes clic a "**Permet**".
6.  Un cop acabat, et donarà una **URL d'aplicació web**. **Copia aquesta URL.**

## Pas 5: Configura l'Aplicació Web

1.  Obre el fitxer `index.html` de la teva aplicació.
2.  Busca la línia de codi a la part superior de l'script:
    ```javascript
    const GAS_URL = 'URL_DEL_TEU_SCRIPT_AQUI';
    ```
3.  **Substitueix** `'URL_DEL_TEU_SCRIPT_AQUI'` per la URL que has copiat al pas anterior.

**I ja està!** La teva aplicació ara pot fer trucades a l'API de Gemini de manera segura.
