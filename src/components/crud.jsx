import { useState, useEffect } from "react";
import "../css/crud.css";
import AjoutCrud from "./ajoutCrud";
import SupprimerCrud from "./supprimerCrud";

function Crud({ titre, headers = [], data = [], onDataChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAjoutCrud, setShowAjoutCrud] = useState(false);
  const [showSupCrud, setShowSupCrud] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [tempData, setTempData] = useState({});
  const [displayData, setDisplayData] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);

  const handleAddData = async (newItem) => {
    try {
      if (onDataChange) {
        await onDataChange(null, newItem);
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
    }
  };

  useEffect(() => {
    setDisplayData([...data]);
  }, [data]);

  useEffect(() => {
    if (highlightedRow !== null) {
      const timer = setTimeout(() => {
        setHighlightedRow(null);
        const newData = [...data];
        const index = newData.findIndex((item) => item.id === highlightedRow);
        if (index > 0) {
          const [highlightedItem] = newData.splice(index, 1);
          newData.unshift(highlightedItem);
          setDisplayData(newData);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedRow, data]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = data.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  const handleHighlightRow = (id) => {
    setHighlightedRow(id);
  };

  const handleEdit = (rowId, currentData) => {
    setEditingRow(rowId);
    setTempData(currentData);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setTempData({});
  };

  const handleSaveEdit = async (rowId) => {
    try {
      if (onDataChange) {
        await onDataChange(rowId, tempData);
      }
      setEditingRow(null);
      setTempData({});
    } catch (err) {
      console.error("Erreur lors de la sauvegarde :", err);
    }
  };

  const handleInputChange = (key, value) => {
    setTempData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="ppp">
      <div className="crud_cont">
        <div className="entete">
          <div className="entete_3">
            <p id="liste_des">Listes des {titre}s:</p>
          </div>
          <div className="entete_2">
            <input
              type="text"
              placeholder="recherche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div id="resultat">
                <p id="p_res">
                  <i className="fa fa-list"></i> Résultats de la recherche (
                  {searchResults.length})
                </p>
                {searchResults.length > 0 ? (
                  <table>
                    <tbody>
                      {searchResults.map((item) => (
                        <tr key={item.id}>
                          <td id="red_td">
                            {Object.values(item)
                              .filter((val) => val !== item.id)
                              .join(" | ")}
                          </td>
                          <td>
                            <button
                              id="btn_info"
                              onClick={() => handleHighlightRow(item.id)}
                            >
                              <i className="fa fa-info"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Aucun résultat trouvé pour "{searchTerm}"</p>
                )}
              </div>
            )}
            <button onClick={() => setShowAjoutCrud(true)}>
              <i className="fa fa-plus"></i> <span>Ajouter</span>
            </button>
          </div>
        </div>
        <div className="bas2">
          <table>
            <thead>
              <tr>
                {headers.map(({ label }, index) => (
                  <th key={index}>{label}</th>
                ))}
                <th id="action" colSpan={2}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((item) => (
                <tr
                  key={item.id}
                  className={highlightedRow === item.id ? "highlight-row" : ""}
                >
                  {headers.map(({ key }, index) => (
                    <td key={`data-${item.id}-${index}`}>
                      {editingRow === item.id ? (
                        <input
                          id="input_modifier"
                          type="text"
                          value={
                            key in tempData ? tempData[key] : item[key] || ""
                          }
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                        />
                      ) : (
                        item[key]
                      )}
                    </td>
                  ))}
                  <td id="butt">
                    {editingRow === item.id ? (
                      <>
                        <button
                          className="valider_modifier"
                          onClick={() => handleSaveEdit(item.id)}
                        >
                          <i className="fa fa-check"></i>
                        </button>
                        <button
                          className="annuler_modifier"
                          onClick={handleCancelEdit}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </>
                    ) : (
                      <button
                        className="modifier"
                        onClick={() => handleEdit(item.id, item)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="supprimer"
                      onClick={() => {
                        setSelectedIdToDelete(item.id);
                        setShowSupCrud(true);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAjoutCrud && (
        <AjoutCrud
          titre_ajout={titre}
          setShowAjoutCrud={setShowAjoutCrud}
          headers={headers}
          onAddData={handleAddData}
        />
      )}
      {showSupCrud && (
        <SupprimerCrud
          titre_sup={titre}
          setShowSupCrud={setShowSupCrud}
          onConfirmDelete={async () => {
            try {
              if (onDataChange && selectedIdToDelete !== null) {
                await onDataChange(selectedIdToDelete, null);
                setSelectedIdToDelete(null);
              }
              setShowSupCrud(false);
            } catch (error) {
              console.error("Erreur lors de la suppression :", error);
            }
          }}
        />
      )}
    </div>
  );
}

export default Crud;
