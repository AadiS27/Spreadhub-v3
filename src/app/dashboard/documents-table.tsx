import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableHeader
} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";
interface DocumentTableProps {
    documents:Doc<"documents">[]|undefined;
    loadMore:(numItems:number)=>void;
    status:PaginationStatus;
}

export const DocumentTable=({
    documents,
    loadMore,
    status
    }:DocumentTableProps)=>{
        return(
            <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col">
            {documents===undefined?(
                <div className="flex justify-center items-center h-24">
                    <LoaderIcon className="animate-spin text-muted-foregroung size-5"/>
                </div>
            ):(
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead>&nbsp;</TableHead>
                            <TableHead className="hidden text-white md:table-cell">Shared</TableHead>
                            <TableHead className="hidden text-white md:table-cell">Created at</TableHead>

                        </TableRow>
                    </TableHeader>
                    {documents.length===0?(
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foregroung">
                                    No documents found
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ):(
                        <TableBody>
                            {documents.map((document)=>(
                                <DocumentRow key={document._id} document={document}/>
                            ))}
                        </TableBody>
                    )}
                </Table>
            )}
            <div className="flex items-center justify-center">
                <Button variant='ghost' size='sm' onClick={()=>loadMore(5)} disabled={status!=="CanLoadMore"}>
                {status==="CanLoadMore"?"Load More":"End of Results"}
                </Button>
            </div>
                </div>
        )
}