import { useState, useEffect } from "react";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Document } from "../types";
import { 
  FileText, Upload, Download, Trash2, Eye, ShieldCheck, Search, 
  CreditCard, Fingerprint, Book, Car, UserCheck, ShoppingBag, 
  Baby, CheckCircle2, AlertCircle, HelpCircle, ExternalLink,
  ChevronRight, ArrowUpRight, Sparkles, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateHash } from "../lib/crypto";
import { GoogleGenAI } from "@google/genai";

const DEMO_DOCS: Document[] = [
  {
    id: "demo-1",
    uid: "demo",
    type: "Aadhaar",
    docNumber: "123456789012",
    status: "Verified",
    isBlockchainVerified: true,
    fileName: "Aadhaar_Card.pdf",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    uploadedAt: new Date().toISOString()
  },
  {
    id: "demo-2",
    uid: "demo",
    type: "PAN",
    docNumber: "ABCDE6789M",
    status: "Verified",
    isBlockchainVerified: true,
    fileName: "PAN_Card.pdf",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    uploadedAt: new Date().toISOString()
  },
  {
    id: "demo-3",
    uid: "demo",
    type: "Passport",
    docNumber: "Z12345678",
    status: "Verified",
    isBlockchainVerified: false,
    fileName: "Passport.pdf",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    uploadedAt: new Date().toISOString()
  },
  {
    id: "demo-4",
    uid: "demo",
    type: "Driving License",
    docNumber: "TN1020230012345",
    status: "Verified",
    isBlockchainVerified: true,
    fileName: "Driving_License.pdf",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    uploadedAt: new Date().toISOString()
  },
  {
    id: "demo-5",
    uid: "demo",
    type: "Voter ID",
    docNumber: "TNX1234567",
    status: "Verified",
    isBlockchainVerified: false,
    fileName: "Voter_ID.pdf",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    uploadedAt: new Date().toISOString()
  },
  {
    id: "demo-6",
    uid: "demo",
    type: "Ration Card",
    docNumber: "RC12345678766",
    status: "Verified",
    isBlockchainVerified: true,
    fileName: "Ration_Card.pdf",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    uploadedAt: new Date().toISOString()
  },
  {
    id: "demo-7",
    uid: "demo",
    type: "Birth Certificate",
    docNumber: "",
    status: "Pending",
    isBlockchainVerified: false,
    fileName: "Birth_Certificate_Draft.pdf",
    fileUrl: "#",
    uploadedAt: new Date().toISOString()
  }
];

const REQUIRED_DOCS = [
  { type: "Aadhaar", label: "Aadhaar Card", icon: Fingerprint },
  { type: "PAN", label: "PAN Card", icon: CreditCard },
  { type: "Passport", label: "Passport", icon: Book },
  { type: "Driving License", label: "Driving License", icon: Car },
  { type: "Voter ID", label: "Voter ID", icon: UserCheck },
  { type: "Ration Card", label: "Ration Card", icon: ShoppingBag },
  { type: "Birth Certificate", label: "Birth Certificate", icon: Baby },
] as const;

export default function DocumentStorage({ uid }: { uid: string }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{id: string, text: string} | null>(null);

  useEffect(() => {
    const q = query(collection(db, "documents"), where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: Document[] = [];
      snapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() } as Document);
      });
      setDocuments(docs);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, "documents"));

    return () => unsubscribe();
  }, [uid]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Simulate file upload to storage
      const fileUrl = `https://picsum.photos/seed/${file.name}/800/1200`;
      
      const newDoc: Omit<Document, "id"> = {
        uid,
        type: "Aadhaar", // Default for demo
        docNumber: `DOC-${Math.floor(Math.random() * 1000000)}`,
        fileUrl,
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        isBlockchainVerified: true,
        status: "Verified"
      };

      await addDoc(collection(db, "documents"), newDoc);
      
      // Blockchain log
      const hash = await generateHash(newDoc);
      await addDoc(collection(db, "audit_logs"), {
        uid,
        action: `Document Uploaded: ${file.name}`,
        timestamp: new Date().toISOString(),
        hash,
        previousHash: "0"
      });

    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      await deleteDoc(doc(db, "documents", id));
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maskNumber = (num: string, type: string) => {
    if (!num || num === "") return "Not Available";
    
    switch(type) {
      case "Aadhaar":
        return `XXXX XXXX ${num.slice(-4)}`;
      case "PAN":
        return `XXXXX${num.slice(-5)}`;
      case "Passport":
        return `${num[0]}XXXX${num.slice(-4)}`;
      case "Driving License":
        return `${num.slice(0, 4)}XXXX${num.slice(-5)}`;
      case "Voter ID":
        return `${num.slice(0, 3)}1234XXX`;
      case "Ration Card":
        return `RCXXXXX${num.slice(-4)}`;
      default:
        return `XXXX-XXXX-${num.slice(-4)}`;
    }
  };

  const allDocuments = [...DEMO_DOCS, ...documents];

  const linkedDocs = REQUIRED_DOCS.map(req => {
    const existing = allDocuments.find(d => d.type === req.type);
    return {
      ...req,
      doc: existing,
      status: existing ? (existing.status || "Verified") : "Missing"
    };
  });

  const linkedCount = linkedDocs.filter(d => d.doc).length;
  const completionRate = (linkedCount / REQUIRED_DOCS.length) * 100;

  const handleUpdate = async (type: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      setIsUploading(true);
      try {
        const fileUrl = `https://picsum.photos/seed/${file.name}/800/1200`;
        const existing = documents.find(d => d.type === type);

        if (existing) {
          await updateDoc(doc(db, "documents", existing.id!), {
            fileUrl,
            fileName: file.name,
            uploadedAt: new Date().toISOString(),
            status: "Verified"
          });
        } else {
          const newDoc: Omit<Document, "id"> = {
            uid,
            type: type as any,
            docNumber: `${type.toUpperCase()}-${Math.floor(Math.random() * 1000000)}`,
            fileUrl,
            fileName: file.name,
            uploadedAt: new Date().toISOString(),
            status: "Verified",
            isBlockchainVerified: true
          };
          await addDoc(collection(db, "documents"), newDoc);
        }
      } catch (error) {
        console.error("Update failed", error);
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

  const handleAnalyze = async (doc: Document) => {
    setAnalyzingId(doc.id!);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{
          parts: [{ text: `Analyze this government document: Type: ${doc.type}, Name: ${doc.fileName}. 
          Provide a short, professional summary of what this document is used for in the Indian government context and any key things the citizen should know about it.` }]
        }]
      });
      setAnalysisResult({ id: doc.id!, text: response.text || "Analysis failed." });
    } catch (error) {
      console.error("Analysis error", error);
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#003366] tracking-tight">Document Vault</h2>
          <p className="text-gray-500 font-medium">Securely manage your Aadhaar-linked digital identity.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all w-72 shadow-sm"
            />
          </div>
          <label className="flex items-center gap-2 px-6 py-3 bg-[#003366] text-white rounded-2xl font-bold text-sm hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 cursor-pointer active:scale-95">
            <Upload className="w-4 h-4" />
            {isUploading ? "Processing..." : "Upload New"}
            <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} />
          </label>
        </div>
      </div>

      {/* Stats Summary Section */}
      <div className="bg-gradient-to-br from-[#003366] to-[#004d99] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <ShieldCheck className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Aadhaar Linked Documents</h3>
                <p className="text-blue-200 text-sm font-medium">Verification Progress</p>
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black">{linkedCount}</span>
              <span className="text-xl font-bold text-blue-300 pb-1">/ {REQUIRED_DOCS.length}</span>
              <span className="text-sm font-bold text-blue-200 pb-1.5 ml-2">Documents Linked</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-md space-y-3">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-blue-100">Completion Status</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.5)]"
              />
            </div>
            <p className="text-[11px] text-blue-200 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3" />
              Your documents are secured with SHA-256 blockchain verification
            </p>
          </div>
        </div>
      </div>

      {/* Aadhaar Linked Documents Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Fingerprint className="w-6 h-6 text-blue-600" />
              Linked Documents (via Aadhaar)
            </h3>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-200">
              Sample Data – For Demo Purpose Only
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {linkedDocs.map((item, idx) => {
            const Icon = item.icon;
            const isMissing = item.status === "Missing";
            const isPending = item.status === "Pending";
            const isVerified = item.status === "Verified";

            return (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Status Indicator Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                  isVerified ? "bg-green-500" : isPending ? "bg-yellow-500" : "bg-red-500"
                }`} />

                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                    isVerified ? "bg-green-50" : isPending ? "bg-yellow-50" : "bg-red-50"
                  }`}>
                    <Icon className={`w-7 h-7 ${
                      isVerified ? "text-green-600" : isPending ? "text-yellow-600" : "text-red-600"
                    }`} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                      isVerified ? "bg-green-100 text-green-700" : 
                      isPending ? "bg-yellow-100 text-yellow-700" : 
                      "bg-red-100 text-red-700"
                    }`}>
                      {isVerified ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {item.status}
                    </span>
                    {item.doc?.isBlockchainVerified && (
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 border border-blue-100">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        BC Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <h4 className="font-black text-gray-900 text-lg">{item.label}</h4>
                  <p className="text-xs font-mono text-gray-400 tracking-wider">
                    {maskNumber(item.doc?.docNumber || "", item.type)}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button 
                    disabled={isMissing}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-30 group/btn"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover/btn:bg-blue-50 transition-colors">
                      <Eye className="w-4 h-4 text-gray-400 group-hover/btn:text-blue-600" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-500">View</span>
                  </button>
                  <a 
                    href={item.doc?.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors group/btn ${isMissing ? "pointer-events-none opacity-30" : ""}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover/btn:bg-green-50 transition-colors">
                      <Download className="w-4 h-4 text-gray-400 group-hover/btn:text-green-600" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-500">Get</span>
                  </a>
                  <button 
                    onClick={() => handleUpdate(item.type)}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors group/btn"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover/btn:bg-orange-50 transition-colors">
                      <Upload className="w-4 h-4 text-gray-400 group-hover/btn:text-orange-600" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-500">{isMissing ? "Upload" : "Update"}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* General Documents Section */}
      <div className="space-y-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-gray-400" />
            All Other Documents
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-100 rounded-[2rem] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredDocs.filter(d => !REQUIRED_DOCS.some(r => r.type === d.type) && d.uid !== "demo").map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#003366]" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(doc.id!)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {doc.isBlockchainVerified && (
                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-[8px] font-bold flex items-center gap-1 border border-blue-100">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          BC Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1 mb-6">
                    <h3 className="font-bold text-gray-900 truncate">{doc.fileName}</h3>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{doc.type}</p>
                  </div>

                  {analysisResult?.id === doc.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100"
                    >
                      <p className="text-[10px] text-blue-800 leading-relaxed italic">
                        {analysisResult.text}
                      </p>
                      <button 
                        onClick={() => setAnalysisResult(null)}
                        className="mt-2 text-[8px] font-bold text-blue-600 uppercase"
                      >
                        Close Analysis
                      </button>
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <button 
                      onClick={() => handleAnalyze(doc)}
                      disabled={analyzingId === doc.id}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      {analyzingId === doc.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3" />
                      )}
                      AI Analyze
                    </button>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-[10px] font-bold text-gray-500">Encrypted</span>
                    </div>
                    <a 
                      href={doc.fileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredDocs.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-gray-400 font-medium">No documents found. Start by uploading one.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
