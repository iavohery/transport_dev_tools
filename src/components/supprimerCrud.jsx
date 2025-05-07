function SupprimerCrud({ titre_sup, setShowSupCrud, onConfirmDelete }) {
  return (
    <div className="floucrud">
      <div className="floucrud1_2">
        <h2>Voulez-vous supprimer cet {titre_sup} ?</h2>
        <p>Ce {titre_sup} va être supprimé définitivement.</p>
        <div className="btn_supprimer">
          <button
            id="oui_sup"
            onClick={() => {
              console.log("Suppression demandée !");
              onConfirmDelete();
            }}
          >
            OUI
          </button>
          <button id="non_sup" onClick={() => setShowSupCrud(false)}>
            NON
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupprimerCrud;
