---
layout: skyground_readme
title: Report a Bug
permalink: /report-a-bug/
---

<div lang="en" markdown="1">

# Report a Bug

Use this form to draft a clear bug report. Copy the preview and post it in the support channel with any logs or screenshots.

</div>
<div lang="fr" markdown="1">

# Signaler un Bug

Utilisez ce formulaire pour rédiger un rapport de bug clair. Copiez l'aperçu et publiez-le dans le canal de support avec les logs ou captures d'écran.

</div>

<div class="contribution-panel" data-contribution-form>
  <form class="contribution-form">
    <div class="contribution-field">
      <label for="contrib-title"><span lang="en">Summary</span><span lang="fr">Résumé</span></label>
      <input id="contrib-title" name="contrib-title" type="text" placeholder="Short issue summary">
    </div>
    <div class="contribution-field">
      <label for="contrib-type"><span lang="en">Type</span><span lang="fr">Type</span></label>
      <select id="contrib-type" name="contrib-type">
        <option value="Bug report">Bug report</option>
        <option value="Crash">Crash</option>
        <option value="Install issue">Install issue</option>
        <option value="Load order issue">Load order issue</option>
      </select>
    </div>
    <div class="contribution-field">
      <label for="contrib-project"><span lang="en">Project</span><span lang="fr">Projet</span></label>
      <select id="contrib-project" name="contrib-project">
        <option value="">Select a project…</option>
        <option value="Wunduniik">Wunduniik</option>
        <option value="Krentoraan">Krentoraan</option>
        <option value="Ghost of the Grid">Ghost of the Grid</option>
        <option value="No Man's Sky Explorer">No Man's Sky Explorer</option>
        <option value="Extrasolar Containment Protocol">Extrasolar Containment Protocol</option>
      </select>
    </div>
    <div class="contribution-field">
      <label for="contrib-details"><span lang="en">Details</span><span lang="fr">Détails</span></label>
      <textarea id="contrib-details" name="contrib-details" placeholder="Steps to reproduce, what you expected, and what happened."></textarea>
    </div>
    <div class="contribution-field">
      <label for="contrib-links"><span lang="en">Links (optional)</span><span lang="fr">Liens (optionnel)</span></label>
      <textarea id="contrib-links" name="contrib-links" placeholder="Paste logs or screenshots, one per line."></textarea>
    </div>
  </form>
  <div class="contribution-preview">
    <div class="contribution-preview__header">
      <h3><span lang="en">Report preview</span><span lang="fr">Aperçu du rapport</span></h3>
      <button class="contribution-copy" type="button" data-contribution-copy><span lang="en">Copy report</span><span lang="fr">Copier le rapport</span></button>
    </div>
    <pre class="contribution-preview__body" data-contribution-preview></pre>
  </div>
</div>

<p class="contributors-note"><span lang="en">Copy the draft above and paste it in the support channel or a GitHub issue.</span><span lang="fr">Copiez le brouillon ci-dessus et collez-le dans le canal de support ou une issue GitHub.</span></p>
