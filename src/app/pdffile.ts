/**
 * Represents the shape of a PDF file object as returned by your backend.
 * You can store the binary data (file_content) in multiple ways depending on usage:
 *   - as a Blob (typical for file downloads),
 *   - as a Base64 string,
 *   - or as ArrayBuffer.
 */
export interface PDFFile {
    /** Primary key ID */
    id: number;
  
    /** Filename of the uploaded PDF */
    filename: string;
  
    /**
     * Raw file data (BLOB).
     * Change type to `string` if your API encodes it in Base64 or to `ArrayBuffer` if that’s how it’s received.
     */
    file_content: Blob;
  
    /** Foreign key to User ID */
    user_id: number;
  
    /** List of categories in the PDF (optional) */
    categories?: string[];
  
    /** List of amounts (optional) */
    amounts?: number[];
  
    /** List of emissions (optional) */
    emissions?: number[];
  }
  