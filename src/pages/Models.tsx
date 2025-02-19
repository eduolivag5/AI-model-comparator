import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Avatar, Tooltip } from "@heroui/react";
import { models } from "../data/models";
import { Link } from "react-router-dom";

export default function Models() {
    return (
        <Table aria-label="Lista de modelos de IA añadidos">
            <TableHeader>
                <TableColumn>LOGO</TableColumn>
                <TableColumn>NOMBRE MODELO</TableColumn>
                <TableColumn>EMPRESA</TableColumn>
                <TableColumn>ESTADO</TableColumn>
            </TableHeader>
            <TableBody>
                {models.map((model) => (
                    <TableRow key={model.id}>
                        <TableCell>
                            <Avatar src={model.icon} alt={model.name} size="sm" />
                        </TableCell>
                        <TableCell>
                            <Tooltip content={`Ver detalles de ${model.name}`}>
                                <Link to={`/models/${model.id}`} className="font-semibold">
                                    {model.name}
                                </Link>
                            </Tooltip>
                        </TableCell>
                        <TableCell>{model.company}</TableCell>
                        <TableCell>
                            <Chip className="capitalize" color={model.active ? 'success' : 'danger'} size="sm" variant="flat">
                                {model.active ? 'Activo' : 'Inactivo'}
                            </Chip>
                        </TableCell>                        
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
