import { InvoiceContext } from 'app/context'
import { useContext } from 'react'

type FooterButtonsProps = {
  toggleEditMode: () => void
  handleUpdateInvoice: () => void
  handleDeleteInvoice: () => void
}

const FooterButtons = ({
  toggleEditMode,
  handleUpdateInvoice,
  handleDeleteInvoice,
}: FooterButtonsProps) => {
  const { editMode } = useContext(InvoiceContext)

  return (
    <div className="stickyFooter">
      <input
        type="button"
        onClick={toggleEditMode}
        value={`Toggle edit mode: ${editMode ? 'on' : 'off'}`}
        className="edit"
      />
      {editMode && (
        <div>
          <input
            type="button"
            onClick={handleUpdateInvoice}
            value={`Save changes`}
            className="save"
          />
          <input
            type="button"
            onClick={handleDeleteInvoice}
            value={`Delete invoice`}
            className="delete"
          />
        </div>
      )}
    </div>
  )
}

export default FooterButtons
