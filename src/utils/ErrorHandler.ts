export class ErrorHandler extends Error {

	public status: number;

	constructor(msg: string, status: number) {
		super(msg);
		this.status = status;
	}

}