import { InvoiceContext } from 'app/context'
import { useContext } from 'react'

type FooterButtonsProps = {
  toggleEditMode: () => void
  handleSaveInvoice: () => void
  handleDeleteInvoice: () => void
}

const FooterButtons = ({
  toggleEditMode,
  handleSaveInvoice,
  handleDeleteInvoice,
}: FooterButtonsProps) => {
  const { invoice, editMode } = useContext(InvoiceContext)

  return (
    <div className="stickyFooter">
      <input
        type="button"
        onClick={toggleEditMode}
        value={`Toggle edit mode: ${editMode ? 'on' : 'off'}`}
        className="edit"
      />
      {editMode ? (
        <div>
          <input
            type="button"
            onClick={handleSaveInvoice}
            value={`Save changes`}
            className="save"
          />
          {invoice?.id ? (
            <input
              type="button"
              onClick={handleDeleteInvoice}
              value={`Delete invoice`}
              className="delete"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default FooterButtons
