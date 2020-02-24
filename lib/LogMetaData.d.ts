interface LogMetaData {
    [index: string]: any;
    path: string;
    method: string;
    created?: string;
    namespace?: string;
    event?: string;
    status?: number;
    duration?: number;
}
export = LogMetaData;
